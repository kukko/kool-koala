import { printKoalaArt } from "./koalas";

if (require.main === module) {
  printKoalaArt();
}

export * from './koalas';

export * from './common';