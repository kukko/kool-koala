# Kool koala

      (\__/)
      (o.o )  KOOL KOALA
      (> < )

The purpose of this package is to make easy to create applications.

## Prerequisites

The only prerequisites is to have the following dependencies installed in your project:

- koa
- koa-router
- typeorm

## How to install

To use it in your project you only need to execute the following command in your project:

```
npm i kool-koala
```

## Start an app

To start an application, you have to write only a few lines of code, like in the example below.

```
import { Configuration, KoalApp } from 'kool-koala';

const configuration = new Configuration({
  port: 8080,
});

KoalApp.getInstance(configuration).start((configuration) => {
  console.log(`KoalApp is started.`);
});
```

## Controllers

To add endpoints to the application you have to create controllers and add them to the `controllers` attribute of the configuration.

A basic controller:

```
import { ControllerBase, StatusCode } from "kool-koala";

export class TestController extends ControllerBase {
  registerEndpoints(): void {
    this.router.get(this.getApiUrl("/test"), (context, res) => {
      context.body = "It is working!";
      context.status = StatusCode.OK;
    });
  }
}
```

To register this controller you have to modify the configuration of the application like this:

```
import { TestController } from './test-controller';
...
const configuration = new Configuration({
  port: 8080,
  controllers: [
      TestController
  ]
});
```
