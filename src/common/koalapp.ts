import Koa, { Next, ParameterizedContext } from 'koa';
import { Configuration } from './configuration';
import { RouterService } from '../services/router-service';
import { AuthenticableEntity } from '../types/entities/authenticable-entity';
import { DataSource } from 'typeorm';
import { StatusCode } from './status-code';
import jwt from 'jsonwebtoken';
import bodyParser from 'koa-bodyparser';
import { BaseResponse, ErrorBase } from '../types';
import serve from "koa-static";
import path from "path";
import fs from "fs";

export class KoalApp<U extends AuthenticableEntity, P> {
  private static instance: KoalApp<any, any>;

  private koa = new Koa();
  private routerService: RouterService<U, P>;
  private databaseConnection: DataSource;

  private constructor(private configuration: Configuration<U, P>) {
  }

  public static getInstance<T extends AuthenticableEntity, Q>(configuration?: Configuration<T, Q>): KoalApp<T, Q> {
    if (!KoalApp.instance) {
      if (!configuration) {
        throw new Error("Configuration is required");
      }
      KoalApp.instance = new KoalApp(configuration!);
    }
    return KoalApp.instance;
  }

  public getConfiguration(): Configuration<U, P> {
    return this.configuration;
  }

  public getDatabaseConnection(): DataSource {
    return this.databaseConnection;
  }

  async initialize() {
    try {
      if (this.configuration.getDatabase()) {
        this.databaseConnection = await this.configuration.getDatabase().dataSource.initialize();
        if (this.configuration.getDatabase().shouldRunMigrations) {
          console.log("Executing database migrations...");
          await this.databaseConnection.runMigrations();
          console.log("Database migrations executed.");
        }
        console.log("Database connection initialized.");
      }
      this.koa.use(this.authorizationHeaderParser.bind(this));
      console.log("Authorization header parser initialized.");
      this.koa.use(bodyParser());
      console.log("Body parser initialized.");
      this.koa.use(this.errorHandler.bind(this));
      console.log("Error handler initialized.");
      this.registerStaticFileServerMiddleware();
      console.log("Static file server initialized.");
    } catch (error) {
      console.log("Error during database initialization...", error);
      throw new Error('Error during application intialization...');
    }
  }

  registerStaticFileServerMiddleware() {
    this.koa.use(serve(path.join(__dirname, '../client', 'browser')));
    this.koa.use(serve(path.join(__dirname, '../../static')));
    this.koa.use(async (ctx, next) => {
      const requestPath = ctx.request.path;

      if (!requestPath.startsWith('/api') && !/\.[a-z]+$/.test(requestPath)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(__dirname, '../client', 'browser', 'index.html'));
      } else {
        await next();
      }
    });
  }

  async start(callback?: (configuration: Configuration<U, P>) => void) {
    this.routerService = new RouterService(
      this.configuration.getControllers(),
      this.configuration.getUserRepository()
    );
    this.koa
      .use(this.routerService.getRoutes())
      .use(this.routerService.allowedMethods());

    this.koa.listen(this.configuration.getPort(), () => {
      if (callback) {
        callback(this.configuration);
      }
    });
  }

  async authorizationHeaderParser(context: ParameterizedContext, next: Next) {
    const authHeader = context.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        context.state.user = jwt.verify(token, this.configuration.getJwtParameters().secretKey);
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

  async errorHandler(context: ParameterizedContext, next: Next) {
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
}