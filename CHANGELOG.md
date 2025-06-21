## [1.5.1](https://github.com/kukko/kool-koala/compare/v1.5.0...v1.5.1) (2025-06-21)


### Bug Fixes

* **database:** does not trying to create query runner if no database configuration is provided ([6d0d764](https://github.com/kukko/kool-koala/commit/6d0d764983247e7ceb93c00d6e15aee264f1fe9d))

# [1.5.0](https://github.com/kukko/kool-koala/compare/v1.4.0...v1.5.0) (2025-04-17)


### Features

* **server:** create context type and use it in rest controller base ([4610170](https://github.com/kukko/kool-koala/commit/46101700a90ece98d74cf7f84adc3bbb1c85b627))

# [1.4.0](https://github.com/kukko/kool-koala/compare/v1.3.0...v1.4.0) (2025-04-16)


### Bug Fixes

* **database:** change the type of the generic type in the soft deletable repository ([a132e23](https://github.com/kukko/kool-koala/commit/a132e2368054dea29cffd319ddbd965ab20efeae))


### Features

* **database:** create delete all and delete where methods in repository base ([c163441](https://github.com/kukko/kool-koala/commit/c16344160b5f5c342541b22e39bfc1c89c518e4b))
* **database:** create soft deletable entity and repository ([93eb49b](https://github.com/kukko/kool-koala/commit/93eb49bb9d17b19795e8b436ead318385106de5f))
* **server:** make possible to stop server ([b2dc42b](https://github.com/kukko/kool-koala/commit/b2dc42be07b810640070eefcf81c5dcd4774469d))

# [1.3.0](https://github.com/kukko/kool-koala/compare/v1.2.1...v1.3.0) (2025-04-04)


### Features

* **deps:** add koa, koa-router and typeorm as dependencies instead of peer dependencies ([1cb9c98](https://github.com/kukko/kool-koala/commit/1cb9c98677f31840fc91b1ebf6f92544b963a01f))

## [1.2.1](https://github.com/kukko/kool-koala/compare/v1.2.0...v1.2.1) (2025-04-04)


### Bug Fixes

* **controller:** change type of route type and permission type gerenric types to only accept enums ([dca54df](https://github.com/kukko/kool-koala/commit/dca54df4b6e7f7d12b2e95320e73823f449562c7))

# [1.2.0](https://github.com/kukko/kool-koala/compare/v1.1.3...v1.2.0) (2025-04-03)


### Features

* **controller:** create rest controller base ([dcab842](https://github.com/kukko/kool-koala/commit/dcab8422127018fad22b2534bb43568318948dca))
* **types:** add all possible values to the status code enum ([ccdc3fc](https://github.com/kukko/kool-koala/commit/ccdc3fce70da8f9b77d76c9a7c9a57513152ca16))

## [1.1.3](https://github.com/kukko/kool-koala/compare/v1.1.2...v1.1.3) (2025-04-02)


### Bug Fixes

* **package:** add type packages to dependencies instead of dev dependencies ([966d844](https://github.com/kukko/kool-koala/commit/966d84499b1477fc87666c6bbf7804abfcb148dc))

## [1.1.2](https://github.com/kukko/kool-koala/compare/v1.1.1...v1.1.2) (2025-04-02)


### Bug Fixes

* **config:** make more parameters optional ([e107365](https://github.com/kukko/kool-koala/commit/e107365c07236fe9d9c60ea5cad457d0caefe7e5))

## [1.1.1](https://github.com/kukko/kool-koala/compare/v1.1.0...v1.1.1) (2025-04-02)


### Bug Fixes

* **package:** generate type definitions for package during compilation ([4c76554](https://github.com/kukko/kool-koala/commit/4c76554413b8d0335c4308e6d6c95e770a0238f7))

# [1.1.0](https://github.com/kukko/kool-koala/compare/v1.0.7...v1.1.0) (2025-04-02)


### Bug Fixes

* **app:** remove unnecessary generic parameters ([be132a6](https://github.com/kukko/kool-koala/commit/be132a6a0e9757c9b5ed6a718a222ba0fa25191a))
* **auth:** parse jwt token correctly ([01ae5e3](https://github.com/kukko/kool-koala/commit/01ae5e3e3b5e6688b5d3f0ac14129998a115663a))


### Features

* **app:** add body parser and error handler middlewares ([c355d40](https://github.com/kukko/kool-koala/commit/c355d40320b9d2afe2659122a17b23c9b58f316f))
* **app:** add koa as dependency and create koalapp class ([9aeffad](https://github.com/kukko/kool-koala/commit/9aeffad095ab424ed61839eab3d5101a7455bfd7))
* **app:** create configuration class and implement singleton pattern in koalapp ([ae2bf83](https://github.com/kukko/kool-koala/commit/ae2bf83fb06832eef7da49b8367d9fe55c0d6a3e))
* **app:** implement server start ([77a5164](https://github.com/kukko/kool-koala/commit/77a51645997634caff4654f6410d3d39d1d21b5c))
* **app:** make database connection optional ([8b5ecb8](https://github.com/kukko/kool-koala/commit/8b5ecb86ca2458a6d498428fe10941689c88a5a6))
* **app:** register static file server middleware ([dd49aa9](https://github.com/kukko/kool-koala/commit/dd49aa95ecbb47937bdd5ad91759db421deace99))
* **auth:** add authorization header parser middleware ([5126eba](https://github.com/kukko/kool-koala/commit/5126eba100d9c087e688411b5cd4adec4ac41fcd))
* **auth:** implement authentication service ([4306f99](https://github.com/kukko/kool-koala/commit/4306f9991fdb225bbb0154c38306b9b518d34a5b))
* **config:** make application more configurable ([c3884ca](https://github.com/kukko/kool-koala/commit/c3884cae4b1fddb0b9dd843793357c5110b24cd2))
* **database:** application connects to the database on startup ([41da573](https://github.com/kukko/kool-koala/commit/41da5731bce4f9e7648e5f1a0cf1a8d94c4f7aea))
* **database:** run migrations after connecting to the database ([fa8fa7e](https://github.com/kukko/kool-koala/commit/fa8fa7e1a74ee93f94ea89fd5815373b982a1801))
* **routing:** add routing middlewares to app ([0993559](https://github.com/kukko/kool-koala/commit/0993559dd799086acf23fa7a4d589bc6da6ef83d))
* **routing:** implement router service and controller base ([d3c206c](https://github.com/kukko/kool-koala/commit/d3c206cd31956edcbfc5931ebef784117d976dec))

## [1.0.7](https://github.com/kukko/kool-koala/compare/v1.0.6...v1.0.7) (2025-04-01)


### Bug Fixes

* **package:** move package.json from dist to root folder after publishing package ([9182fb9](https://github.com/kukko/kool-koala/commit/9182fb9b795c0446bf542ab048ba46e82a295720))
* **refactor:** move koala to a separate file ([7b306d8](https://github.com/kukko/kool-koala/commit/7b306d8b52e270d11be1b8294836164fec9d7e55))

## [1.0.6](https://github.com/kukko/kool-koala/compare/v1.0.5...v1.0.6) (2025-04-01)


### Bug Fixes

* **koala:** i had to make an important change to the koala ([8a96a72](https://github.com/kukko/kool-koala/commit/8a96a725bc178770854d2a6194ac11cdc802e189))

## [1.0.5](https://github.com/kukko/kool-koala/compare/v1.0.4...v1.0.5) (2025-04-01)


### Bug Fixes

* **package:** give executable permission to binary file ([312c25a](https://github.com/kukko/kool-koala/commit/312c25af2c0dfc9c21c0bb10a2d71a8751c1d812))

## [1.0.4](https://github.com/kukko/kool-koala/compare/v1.0.3...v1.0.4) (2025-04-01)


### Bug Fixes

* **package:** handle bin completly ([85f2598](https://github.com/kukko/kool-koala/commit/85f259824e104944cce9585b2c6ef874be2db8bb))

## [1.0.3](https://github.com/kukko/kool-koala/compare/v1.0.2...v1.0.3) (2025-04-01)


### Bug Fixes

* **package:** specify bin as a single file ([fae6037](https://github.com/kukko/kool-koala/commit/fae6037677224a10c8c525dcf57c2b8b1e566b8b))

## [1.0.2](https://github.com/kukko/kool-koala/compare/v1.0.1...v1.0.2) (2025-04-01)


### Bug Fixes

* **package:** specify bin in package.json ([1d70959](https://github.com/kukko/kool-koala/commit/1d709597ec6e819a1386072e1140ed3aef1f22be))

## [1.0.1](https://github.com/kukko/kool-koala/compare/v1.0.0...v1.0.1) (2025-04-01)


### Bug Fixes

* **build:** change semantic-release configuration ([8ae6d64](https://github.com/kukko/kool-koala/commit/8ae6d6489189891ab57e72db43f23748c71740bb))
* **build:** do not run commitizen when commiting from the release workflow ([84e7a13](https://github.com/kukko/kool-koala/commit/84e7a13c75aeb7316e5303d9e3fa6d2046e1302a))
* **build:** make header-max-length rule to only raise a warning instead of an error ([7347646](https://github.com/kukko/kool-koala/commit/7347646e3046261a54264f0dba51cd616b15e514))

# 1.0.0 (2025-04-01)


### Bug Fixes

* **build:** compile release version correctly ([7643194](https://github.com/kukko/kool-koala/commit/7643194248646bbca96e8b474c3f580d0c3b6380))
* **build:** install dependencies needed for releasing new version of the package ([c5f6c07](https://github.com/kukko/kool-koala/commit/c5f6c079e3b1be0fad095bcedc96ee6f721f2f5b))
* **build:** install dependencies with install instead of clean install ([8f2c366](https://github.com/kukko/kool-koala/commit/8f2c3662261adbdc9cde9f530126f225848119f1))
* **build:** release package version correctly ([0e9f189](https://github.com/kukko/kool-koala/commit/0e9f189b6b236829cbdfda676860fcf09eeff9e0))
* **build:** run the correct script to compile release version ([0989731](https://github.com/kukko/kool-koala/commit/0989731489eb8efea6484687245da0b8734ea1ac))


### Features

* **build:** create basic build process ([756c7c9](https://github.com/kukko/kool-koala/commit/756c7c9e9b59cd79b236fa97d25da320178ae10c))
* **git:** implement conventional commits ([89b52ea](https://github.com/kukko/kool-koala/commit/89b52eaf6059c3a0cab89f381f6f7674242ab8fb))
* **workflow:** create release workflow ([7113173](https://github.com/kukko/kool-koala/commit/7113173808d074ae7d7142517923fcbdb165e3bf))
