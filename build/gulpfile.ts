import { exec } from "child_process";
import gulp, { series } from "gulp";
import gulpNodemon from "gulp-nodemon";
import rename from "gulp-rename";
import sourceMap from "gulp-sourcemaps";
import ts from "gulp-typescript";
import { dirname, join } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { rimrafSync } from 'rimraf';

const argv = yargs(hideBin(process.argv))
  .options({
    production: { type: "boolean", default: false },
    fromPlugin: { type: "boolean", default: false },
  })
  .parseSync();

let pathPrefixes: string[] = argv.fromPlugin ? [] : [".."];

function getPath(path: string) {
  return join(...[...pathPrefixes, path]).replace(/\\/g, "/");
}

function getDistPath(): string {
  return getPath("dist");
}

const tsProject = ts.createProject(getPath("tsconfig.json"));

gulp.task("clean", (done) => {
  rimrafSync(getPath(
    "dist"
  ));
  done();
});

gulp.task("compile-ts", () => {
  return gulp
    .src([getPath("src/**/*.ts"), "!" + getPath("src/**/example-*.ts")])
    .pipe(sourceMap.init())
    .pipe(tsProject())
    .on("error", () => { })
    .pipe(
      sourceMap.mapSources((sourcePath) => {
        return "../src/" + sourcePath.replace(/\.js$/, ".ts");
      })
    )
    .pipe(sourceMap.write("../dist"))
    .on("error", () => { })
    .pipe(gulp.dest(getDistPath()));
});

gulp.task("copy-files", () => {
  const src = argv.production
    ? [
      getPath("src/**/*.js"),
      getPath("src/**/example-*.ts"),
      getPath("package.json"),
      getPath("README.md"),
    ]
    : [getPath("src/**/*.js"), getPath("src/**/example-*.ts")];
  return gulp.src(src).pipe(gulp.dest(getDistPath()));
});

gulp.task(
  "compile",
  gulp.series("compile-ts", "copy-files")
);

gulp.task("swithch-to-production", (done) => {
  argv.production = true;
  done();
});

gulp.task("compile-release", gulp.series("swithch-to-production", "clean", "compile"));

gulp.task("watch", () => {
  const sourceFolder = "src";
  const watcher = gulp.watch(getPath(`${sourceFolder}/**/*`));
  watcher.on("change", (path, stats) => {
    console.log(`Recompiling: ${path}`);
    gulp
      .src([path])
      .pipe(sourceMap.init())
      .pipe(tsProject())
      .on("error", () => { })
      .pipe(
        sourceMap.mapSources((sourcePath) => {
          return "../src/" + sourcePath.replace(/\.js$/, ".ts");
        })
      )
      .pipe(sourceMap.write("../dist"))
      .on("error", () => { })
      .pipe(
        rename((file) => {
          file.dirname = getPath(
            "dist" +
            dirname(path)
              .replace(/\.\.(\/|\\)/, "")
              .substring(sourceFolder.length)
          );
        })
      )
      .pipe(gulp.dest("."));
  });
  watcher.on("add", (path, stats) => {
    console.log(`Compiling: ${path}`);
    gulp
      .src([path])
      .pipe(sourceMap.init())
      .pipe(tsProject())
      .on("error", () => { })
      .pipe(
        sourceMap.mapSources((sourcePath) => {
          return "../src/" + sourcePath.replace(/\.js$/, ".ts");
        })
      )
      .pipe(sourceMap.write("../dist"))
      .on("error", () => { })
      .pipe(
        rename((file) => {
          file.dirname = getPath(
            "dist" +
            dirname(path)
              .replace(/\.\.(\/|\\)/, "")
              .substring(sourceFolder.length)
          );
        })
      )
      .pipe(gulp.dest("."));
  });
  watcher.on("unlink", (path, stats) => {
    path = "dist" + path.substring(sourceFolder.length, path.length - 2) + "js";
    console.log(`Removing: ${path}`);
    return exec(`npx rimraf ${path}`, {
      cwd: getPath(""),
    });
  });
});

gulp.task("nodemon", () => {
  var stream = gulpNodemon({
    script: getPath("dist/index.js"),
    watch: [getPath("dist")],
  });
  stream
    .on("restart", () => {
      console.log("Server restarted!");
    })
    .on("crash", () => {
      stream.emit("restart", 10);
    });
});

gulp.task("rebuild", series("clean", "compile"));

gulp.task("deploy-client", () => {
  return gulp
    .src(getPath("../client/dist/**/*"))
    .pipe(gulp.dest(getPath("dist")));
});

gulp.task(
  "default",
  gulp.series("clean", "compile", "deploy-client", gulp.parallel("nodemon", "watch"))
);