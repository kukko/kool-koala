import { Configuration, ConfigurationParameters, KoalApp } from "../../src";

export function getKoalAppMock(configurationParameters: ConfigurationParameters) {
  return KoalApp.getInstance(new Configuration({
    ...configurationParameters
  }));
};
