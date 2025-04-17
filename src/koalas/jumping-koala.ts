import { koalaAscii } from "./koala-ascii";
import { koalaRotatedAscii } from "./koala-rotated-ascii";

export function jumpingKoala() {
  console.clear();
  let koalaPosition = 0;
  let maxOutputWidth = process !== undefined && process.stdout !== undefined ? process.stdout.columns : 54;
  let koalaDirection = 1;
  let koalaAltitude = 0;
  let maxKoalaAltitude = 5;
  let koalaAscending = true;
  let ascensionSpeed = 0.4;
  let boundaryThreshold = 0.7;
  const printKoala = () => {
    console.clear();
    let basicKoala = koalaDirection > 0 ? koalaRotatedAscii : koalaAscii;
    let koalaWidth = basicKoala.split("\n").reduce((max, line) => {
      return Math.max(max, line.length);
    }, 0);
    let maxKoalaPosition = maxOutputWidth - koalaWidth;
    let i = 0;
    for (; i < maxKoalaAltitude - koalaAltitude; i++) {
      console.log();
    }
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
    if (koalaAscending && koalaAltitude < maxKoalaAltitude) {
      koalaAltitude += (maxKoalaAltitude - koalaAltitude) * ascensionSpeed;
      if (koalaAltitude >= maxKoalaAltitude - boundaryThreshold) {
        koalaAscending = !koalaAscending;
      }
      if (koalaAltitude > maxKoalaAltitude) {
        koalaAltitude = maxKoalaAltitude;
      }
    }
    else if (!koalaAscending && koalaAltitude > 0) {
      koalaAltitude -= (maxKoalaAltitude - koalaAltitude) * ascensionSpeed;
      if (koalaAltitude <= boundaryThreshold) {
        koalaAscending = !koalaAscending;
      }
      if (koalaAltitude < 0) {
        koalaAltitude = 0;
      }
    }
    for (let j = 0; j < maxKoalaAltitude - i; j++) {
      console.log();
    }
    console.log("‾".repeat(maxKoalaPosition + koalaWidth));
  };
  setInterval(printKoala, 100);
}