import Router from "koa-router";
import { ControllerBase, ControllerConstructor } from "../../src";

export function getMockController(mockRoute: string = '/mock'): ControllerConstructor {
  return class MockController extends ControllerBase {
    constructor(protected router: Router) {
      super(router);
    }

    registerEndpoints(): void {
      this.router.get(mockRoute, () => { });
    }
  };
}
