import Koa, { Next, ParameterizedContext } from 'koa';
import { Configuration } from './configuration';
import { RouterService } from '../services/router-service';
import { AuthenticableEntity } from '../types/entities/authenticable-entity';
import { DataSource } from 'typeorm';
import { StatusCode } from './status-code';
import jwt from 'jsonwebtoken';

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
      this.databaseConnection = await this.configuration.getDataSource().initialize();
      await this.databaseConnection.runMigrations();
      console.log("Database connection initialized.");
      this.koa.use(this.authorizationHeaderParser.bind(this));
      console.log("Authorization header parser initialized.");
    } catch (error) {
      console.log("Error during database initialization...", error);
      throw new Error('Error during application intialization...');
    }
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
        context.state.user = jwt.verify(token, this.configuration.getJwtSecretKey());
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
}