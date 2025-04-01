import { Repository } from "typeorm";
import { ControllerConstructor } from "../controllers/controller-base";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";

export class Configuration<U extends AuthenticableEntity, P> {
  private port = 8080;
  constructor(
    private controllers: (ControllerConstructor<U, P>)[],
    private saltRounds: number,
    private jwtSecretKey: string,
    private userRepository: Repository<U>
  ) { }
  getControllers() {
    return this.controllers;
  }
  getPort(): number {
    return this.port;
  }
  getSaltRounds(): number {
    return this.saltRounds;
  }
  getJwtSecretKey(): string {
    return this.jwtSecretKey;
  }
  getUserRepository() {
    return this.userRepository;
  }
}
