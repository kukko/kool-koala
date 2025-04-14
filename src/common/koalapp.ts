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
import { AuthorizationService } from '../services';
import { StringEnum } from '../types/common/string-enum';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';
import { transactionMiddleware } from '../middlewares/transaction-middleware';

export class KoalApp<
  U extends AuthenticableEntity,
  P extends StringEnum
> {
  private static instance: KoalApp<any, any>;

  private koa = new Koa();
  private routerService: RouterService;
  private databaseConnection: DataSource;

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

  public static resetInstance() {
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
      this.registerStaticFileServerMiddleware();
      console.log("Static file server initialized.");
      this.registerEndpoints();
      console.log("Endpoints registered.");
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

  registerStaticFileServerMiddleware() {
    this.koa.use(serve(path.join(__dirname, '../client', 'browser')));
    this.koa.use(serve(path.join(__dirname, '../../static')));
    this.koa.use(async (ctx, next) => {
      const requestPath = ctx.request.path;

      if (!requestPath.startsWith(this.configuration.getRestPrefix()) && !/\.[a-z]+$/.test(requestPath)) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(__dirname, '../client', 'browser', 'index.html'));
      } else {
        await next();
      }
    });
  }

  registerEndpoints() {
    this.routerService = new RouterService(
      this.configuration.getControllers()
    );
    this.koa
      .use(this.routerService.getRoutes())
      .use(this.routerService.allowedMethods());
  }

  async start(callback?: (configuration: Configuration<U, P>) => void) {
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

  getAuthorizationService() {
    return this.authorizationService;
  }
}