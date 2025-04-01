import Koa from 'koa';
import { Configuration } from './configuration';

export class KoalApp {
  private static instance: KoalApp;

  private koa = new Koa();

  private constructor(private configuration: Configuration) {
  }

  public static getInstance(configuration?: Configuration): KoalApp {
    if (!KoalApp.instance) {
      if (!configuration) {
        throw new Error("Configuration is required");
      }
      KoalApp.instance = new KoalApp(configuration!);
    }
    return KoalApp.instance;
  }
}