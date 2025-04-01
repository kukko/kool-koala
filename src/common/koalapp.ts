import Koa from 'koa';
import { Configuration } from './configuration';
import { RouterService } from '../services/router-service';
import { AuthenticableEntity } from '../types/entities/authenticable-entity';

export class KoalApp<U extends AuthenticableEntity, P> {
  private static instance: KoalApp<any, any>;

  private koa = new Koa();
  private routerService: RouterService<U, P>;

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

  async initialize() {
    try {
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
}