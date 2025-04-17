import { koalaAscii } from "./koala-ascii";
import { koalaRotatedAscii } from "./koala-rotated-ascii";
import { originalKoala } from "./original-koala";
import { rotatedKoala } from "./rotated-koala";

export function runningKoala() {
  console.clear();
  let koalaPosition = 0;
  const maxOutputWidth = process !== undefined && process.stdout !== undefined ? process.stdout.columns : 50;
  let koalaDirection = 1;
  const printKoala = () => {
    console.clear();
    let basicKoala = koalaDirection > 0 ? koalaRotatedAscii : koalaAscii;
    let koalaWidth = basicKoala.split("\n").reduce((max, line) => {
      return Math.max(max, line.length);
    }, 0);
    const maxKoalaPosition = maxOutputWidth - koalaWidth;
    console.log(basicKoala.split("\n").map((line) => {
      return " ".repeat(koalaPosition) + line;
    }).join("\n"));
    koalaPosition += koalaDirection;
    if (koalaDirection > 0 && koalaPosition >= maxKoalaPosition) {
      koalaDirection = koalaDirection * -1;
    }
    else if (koalaDirection < 0 && koalaPosition <= 0) {
      koalaDirection = koalaDirection * -1;
    }
    console.log("‾".repeat(maxKoalaPosition + koalaWidth));
  };
  setInterval(printKoala, 100);
}