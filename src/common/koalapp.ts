import Koa, { Next } from 'koa';
import { Configuration } from './configuration';
import { RouterService } from '../services/router-service';
import { AuthenticableEntity } from '../types/entities/authenticable-entity';
import { DataSource } from 'typeorm';
import { StatusCode } from './status-code';
import jwt from 'jsonwebtoken';
import bodyParser from 'koa-bodyparser';
import { BaseResponse, ErrorBase } from '../types';
import path from "path";
import fs from "fs";
import { AuthorizationService } from '../services';
import { StringEnum } from '../types/common/string-enum';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';
import { transactionMiddleware } from '../middlewares/transaction-middleware';
import { Server } from 'http';
import { Context } from '../types/common/context';

export class KoalApp<
  U extends AuthenticableEntity,
  P extends StringEnum
> {
  private static instance: KoalApp<any, any>;

  private koa = new Koa();
  private routerService: RouterService;
  private databaseConnection: DataSource;

  private server: Server;

  private authorizationService: AuthorizationService<U, P>;

  private constructor(private configuration: Configuration<U, P>) {
  }

  public static getInstance<
    T extends AuthenticableEntity,
    Q extends StringEnum
  >(configuration?: Configuration<T, Q>): KoalApp<T, Q> {
    if (!KoalApp.instance) {
      if (!configuration) {
        throw new Error("Configuration is required");
      }
      KoalApp.instance = new KoalApp(configuration!);
    }
    return KoalApp.instance;
  }

  public static async resetInstance() {
    await KoalApp.getInstance().getDatabaseConnection().destroy();
    KoalApp.instance = undefined;
  }

  public getConfiguration(): Configuration<U, P> {
    return this.configuration;
  }

  public getRouterService(): RouterService {
    return this.routerService;
  }

  public getDatabaseConnection(): DataSource {
    return this.databaseConnection;
  }
  async initialize() {
    try {
      await this.setupDatabaseConnection();
      console.log("Database connection initialized.");
      this.setupErrorHandler();
      console.log("Error handler initialized.");
      this.setupTransaction();
      console.log("Transaction starter middleware initialized.");
      this.koa.use(this.authorizationHeaderParser.bind(this));
      console.log("Authorization header parser initialized.");
      this.koa.use(bodyParser());
      console.log("Body parser initialized.");
      this.registerMiddlewaresFromConfiguration();
      console.log("Middlewares registered from configuration.");
      this.registerEndpoints();
      console.log("Endpoints registered.");
      this.registerStaticFileServerMiddleware();
      console.log("Static file server initialized.");
    } catch (error) {
      console.log("Error during database initialization...", error);
      throw new Error('Error during application intialization...');
    }
  }
  async setupDatabaseConnection() {
    if (this.configuration.getDatabase()) {
      this.databaseConnection = await this.configuration.getDatabase().dataSource.initialize();
      await this.databaseConnection.runMigrations();
    }
  }
  setupErrorHandler() {
    this.koa.use(errorHandlerMiddleware);
  }
  setupTransaction() {
    this.koa.use(transactionMiddleware);
  }

  registerEndpoints() {
    this.routerService = new RouterService(
      this.configuration.getControllers()
    );
    this.koa
      .use(this.routerService.getRoutes())
      .use(this.routerService.allowedMethods());
  }

  registerStaticFileServerMiddleware() {
    const configs = this.configuration.getStaticFilesConfiguration();
    if (!configs) return;

    this.koa.use(async (ctx: Context, next: () => Promise<void>) => {
      const requestPath = ctx.request.path.replace(/^\//, "");
      let fileServed = false;

      for (const staticFilesConfig of configs) {
        const staticFilesPath = path.isAbsolute(staticFilesConfig.folder)
          ? staticFilesConfig.folder
          : path.join(path.dirname(require.main.filename), staticFilesConfig.folder);

        const filePath = path.join(staticFilesPath, requestPath);

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          ctx.type = path.extname(filePath).slice(1) || "application/octet-stream";
          const stat = fs.statSync(filePath);
          ctx.set("Content-Length", stat.size.toString());
          ctx.body = fs.createReadStream(filePath);
          fileServed = true;
          break;
        }
      }

      if (!fileServed) {
        for (const staticFilesConfig of configs) {
          const staticFilesPath = path.isAbsolute(staticFilesConfig.folder)
            ? staticFilesConfig.folder
            : path.join(path.dirname(require.main.filename), staticFilesConfig.folder);
          const defaultFile = staticFilesConfig.defaultFile ?? "index.html";
          const defaultFilePath = path.join(staticFilesPath, defaultFile);

          if (fs.existsSync(defaultFilePath) && fs.statSync(defaultFilePath).isFile()) {
            ctx.type = staticFilesConfig.defaultFileMimeType ?? "text/html";
            const stat = fs.statSync(defaultFilePath);
            ctx.set("Content-Length", stat.size.toString());
            ctx.body = fs.createReadStream(defaultFilePath);
            fileServed = true;
            break;
          }
        }
      }

      if (!fileServed) {
        await next();
      }
    });
  }

  registerMiddlewaresFromConfiguration() {
    for (const middleware of this.configuration.getMiddlewares() || []) {
      this.koa.use(middleware);
    }
  }

  async start(callback?: (configuration: Configuration<U, P>) => void) {
    this.server = this.koa.listen(this.configuration.getPort(), () => {
      if (callback) {
        callback(this.configuration);
      }
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      if (this.server) {
        this.server.close((error) => {
          if (!error) {
            resolve();
          }
          else {
            reject();
          }
        });
        this.server = undefined;
      }
      else {
        reject();
      }
    });
  }

  async authorizationHeaderParser(context: Context, next: Next) {
    const authHeader = context.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        context.state.user = <AuthenticableEntity>jwt.verify(token, this.configuration.getJwtParameters().secretKey);
        await next();
      } catch (error) {
        context.status = StatusCode.UNAUTHORIZED;
        context.body = {
          success: false,
          message: 'Invalid token'
        }
      }
    }
    else {
      await next();
    }
  }

  async errorHandler(context: Context, next: Next) {
    try {
      await next();
    } catch (error) {
      if (error instanceof ErrorBase) {
        context.status = error.getStatusCode();
        context.body = <BaseResponse>{
          success: false,
          message: error.message
        };
      }
      else {
        console.log(error);
        context.status = StatusCode.INTERNAL_SERVER_ERROR;
        context.body = <BaseResponse>{
          success: false
        };
      }
    }
  }

  getAuthorizationService() {
    return this.authorizationService;
  }
}