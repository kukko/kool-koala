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

## Database connection

You can also setup a database connection with kool-koala, by setting a few parameters for the configuration.

```
const configuration = new Configuration({
  ...
  database: {,
    dataSource: new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'passwor',
      database: 'database',
      entities: [
        // List of classes what you want to manage within the application.
      ]
    })
    shouldRunMigrations
  }
});
```

> **Note:** For every database connection configuration what you can pass to the DataSource object, please see the documentation of [TypeORM](https://typeorm.io/data-source-options).

## Database entities

The package provides multiple classes what you can extend to create database entities what already implement some functionalities so you don't have to implement it yourself.

> **Note:** About how you can declare the attributes of the entities, please see the documentation of [TypeORM](https://typeorm.io/entities).

### EntityBase

This class contains an `id` attribute, which will be an auto increment id for the entities which extends this class.

### AuditedEntityBase

Extending the `EntityBase` class, it inherits all its functionalities.

This class contains a `createdAt` attribute which will be set to the current date and time when an entity is being saved into the database.

This class also contains an `updatedAt` attribute which will be set to the current date and time when an entity is modified and saved into the database. After the entity creation it's value will be the same as the `createdAt` field's value.

### SoftDeletableEntityBase

Extending the `EntityBase` class, it inherits all its functionalities.

This class provides the possibility to mark the entities in the database as deleted and exempt them from the query results.

It contains a `deletedAt` attribute which remains null until the entity is being deleted. After that the value of the attribute will store the date and time of deletion of the entity.

> **Note:** These functionalities only work if the entity is being manipulated with a repository which extends `SoftDeletableRepositoryBase` class.

### SoftDeletableAuditedEntityBase

Extending the `AuditedEntityBase` class, it inherits all its functionalities.

This class combines the functionalities of the `EntityBase`, `AuditedEntityBase` and the `SoftDeletableEntityBase` classes.

## Repositories

The package provides repository classes which help the user to manipulate entities in the database.

### RepositoryBase

This class provides methods which implements basic manipulative and query methods for the entities.

To use this class you have to create a class which extends it and implements the abstract methods.

The class requires a generic type which have to be a class which implements the `IdentifiableEntity` interface. For example if you provide a class which extends the `EntityBase` class, that would be correct.

> **Note:** All of the methods described below mainly manipulates the entities of the type provided in the `T` generic type for the class.

> **Note:** You can find information about the following classes in the documentation of TypeORM: `FindManyOptions`, `FindOneOptions`, `FindOptionsWhere`, `FindOptionsRelations`, `DeepPartial`, `DeleteResult`

**getAll(): Promise<T[]>**

Returns a Promise which will resolve all entities from the database.

**getWhere(options: FindManyOptions<T>): Promise<T[]>**

Returns a Promise which will resolve those entities which matches the provided where criterias in the `options` parameter.

**getOneWhere(options: FindOneOptions<T>): Promise<T>**

Returns a Promise which will resolve the first entity which matches the provided where criterias in the `options` parameter.

**getById(id: number, relations?: FindOptionsRelations<T>): Promise<T>**

Returns a Promise which will resolve the entity with the provided `id`. It can also load related entities which is provided in the `relations` parameter.

**save(entity: T | DeepPartial<T>): Promise<DeepPartial<T> & T>**

Saves the provided entity into the database. If the primary key attribute is set, it will update the already existing entity, if it isn't, then it will insert the entity into the database.

Returns a Promise which will resolve the saved entity.

**delete(entity: T): Promise<DeleteResult>**

Deletes the specified entity from the database.

Returns a Promise which will resolve an object which contain information about the deletion.

**deleteWhere(where?: FindOptionsWhere<T>): Promise<DeleteResult>**

Deletes those entities which matches the provided where criterias.

Returns a Promise which will resolve an object which contain information about the deletion.

**deleteAll(): Promise<DeleteResult>**

Deletes all entities from the database.

Returns a Promise which will resolve an object which contain information about the deletion.

### SoftDeletableRepositoryBase

This class extends the `RepositoryBase` class.

The class requires a generic type which have to be a class which implements the `IdentifiableEntity` and the `SoftDeletable` interfaces. For example if you provide a class which extends the `SoftDeletableEntityBase` class or the `SoftDeletableAuditedEntityBase`, that would be correct.

The `getAll`, `getWhere`, `getOneWhere` and the `getById` methods works the same way as in the `RepositoryBase` class they just have an optional `boolean` typed `withDeleted` parameter at the end of the parameters list, which is `false` by default and it handles if the entities which is marked as deleted have to be returned by the query or not. If it is true, it will returns the entities which is marked as deleted.

The `delete`, `deleteWhere` and the `deleteAll` methods works the same way as in the `RepositoryBase` class they just have an optional `boolean` typed `hardDelete` parameter at the end of the parameters list, which is `false` by default and if it is true, it will not only marks the entities as deleted but literally delete them from the database.
