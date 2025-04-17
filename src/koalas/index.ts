import { jumpingKoala } from "./jumping-koala";
import { originalKoala } from "./original-koala";
import { rotatedKoala } from "./rotated-koala";
import { runningKoala } from "./running-koala";
import { secretKoala } from "./secret-koala";

export function printKoalaArt(): void {
  const koalas = [
    originalKoala,
    rotatedKoala,
    runningKoala,
    jumpingKoala
  ];
  if (Math.random() < 0.07) {
    koalas.push(secretKoala);
  }
  koalas[Math.floor(Math.random() * koalas.length)]();
}
