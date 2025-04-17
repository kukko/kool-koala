import { koalaRotatedAscii } from "./koala-rotated-ascii";

export function rotatedKoala() {
  const koalaLines = koalaRotatedAscii.split('\n');
  koalaLines[Math.floor(koalaLines.length / 2)] += '  KOOL KOALA';
  console.log(koalaLines.join('\n'));
}