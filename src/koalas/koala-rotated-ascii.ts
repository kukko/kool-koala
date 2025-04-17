import { koalaAscii } from "./koala-ascii";

export const koalaRotatedAscii = koalaAscii.split("\n").map((line) => {
  const characterConterparts: { [key: string]: string } = {
    '(': ')',
    ')': '(',
    '<': '>',
    '>': '<',
    '/': '\\',
    '\\': '/'
  };
  const rotatedLine = line.split("").map((originalCharacter) => {
    return characterConterparts[originalCharacter] || originalCharacter;
  }).reverse().join("");
  return rotatedLine;
}
).join("\n");