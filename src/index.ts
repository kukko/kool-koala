import { printKoalaArt } from "./koalas";

if (require.main === module) {
  printKoalaArt();
}

export * from './koalas';

export * from './common';
export * from './controllers';
export * from './services';
export * from './types';
