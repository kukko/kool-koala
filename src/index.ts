export function printKoalaArt(): void {
  const koalaAscii = `
      (\__/)
      (o.o )  KOOL KOALA
      (> < )
  `;
  console.log(koalaAscii);
}

if (require.main === module) {
  printKoalaArt();
}
