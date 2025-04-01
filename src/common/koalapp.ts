import Koa from 'koa';

export class KoalApp {
  private static instance: KoalApp;

  private koa = new Koa();
}