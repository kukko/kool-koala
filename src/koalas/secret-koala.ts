import { koalaRotatedAscii } from "./koala-rotated-ascii";

export function secretKoala() {
  console.clear();
  const messages = [
    '',
    'Oh!',
    'Hello there!',
    'You found me!',
    'I am the koala!',
    'Sekret koala!',
    'We didn\'t met.',
    'Okay?',
    'Capisce?',
  ];
  let messageIndex = 0;
  const minFrameLength = 1000;
  const framLengthPerChar = 100;
  const calculateFrameLength = (message: string) => {
    const frameLength = message.length * framLengthPerChar;
    return Math.max(frameLength, minFrameLength);
  }
  const printKoala = () => {
    console.clear();
    const koalaLines = koalaRotatedAscii.split('\n');
    koalaLines[Math.floor(koalaLines.length / 2)] += '  ' + messages[messageIndex];
    console.log(koalaLines.join('\n'));
    messageIndex++;
    if (messageIndex < messages.length) {
      setTimeout(printKoala, calculateFrameLength(messages[messageIndex]))
    }
    else {
      setTimeout(() => {
        console.clear();
      }, calculateFrameLength(messages[messages.length - 1]));
    }
  };
  setTimeout(printKoala, calculateFrameLength(messages[messageIndex]));
}