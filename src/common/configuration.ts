export class Configuration {
  private port = 8080;
  constructor(
    private saltRounds: number,
    private jwtSecretKey: string
  ) { }
  getPort(): number {
    return this.port;
  }
  getSaltRounds(): number {
    return this.saltRounds;
  }
  getJwtSecretKey(): string {
    return this.jwtSecretKey;
  }
}
