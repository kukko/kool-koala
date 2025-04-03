import { ParameterizedContext } from "koa";
import { RepositoryBase } from "../database/repositories";
import { BaseResponse, ErrorBase, IdentifiableEntity } from "../types";
import { ControllerBase } from "./controller-base";
import { KoalApp, StatusCode } from "../common";
import { DeepPartial } from "typeorm";

export abstract class RestControllerBase<T extends IdentifiableEntity, RouteType extends Record<string, string>, PermissionType extends Record<string, string>, CreateRequest extends any = Omit<T, 'id'>, EditRequest = T> extends ControllerBase {
  abstract getEndpoint(): RouteType[keyof RouteType];
  abstract getRepository(): RepositoryBase<T>;
  registerEndpoints(): void {
    if (this.shouldRegisterListEndpoint()) {
      this.router.get(this.getApiUrl(this.getEndpoint()), this.listEntities.bind(this));
    }
    if (this.shouldRegisterViewEndpoint()) {
      this.router.get(this.getApiUrl(`${this.getEndpoint()}/:id`), this.viewEntity.bind(this));
    }
    if (this.shouldRegisterCreateEndpoint()) {
      this.router.post(this.getApiUrl(this.getEndpoint()), this.createEntity.bind(this));
    }
    if (this.shouldRegisterEditEndpoint()) {
      this.router.put(this.getApiUrl(`${this.getEndpoint()}/:id`), this.editEntity.bind(this));
    }
    if (this.shouldRegisterDeleteEndpoint()) {
      this.router.delete(this.getApiUrl(`${this.getEndpoint()}/:id`), this.deleteEntity.bind(this));
    }
  }
  protected getAuthorizationService() {
    return KoalApp.getInstance().getAuthorizationService();
  }
  async listEntities(context: ParameterizedContext): Promise<void> {
    if (this.getListPermission() !== undefined) {
      await this.getAuthorizationService().userHasRight(context.state.user, this.getListPermission());
    }
    context.body = await this.getEntities(context);
  }
  async viewEntity(context: ParameterizedContext): Promise<void> {
    if (this.getViewPermission() !== undefined) {
      await this.getAuthorizationService().userHasRight(context.state.user, this.getViewPermission());
    }
    const entity = await this.getById(context);
    if (entity) {
      context.body = entity;
    }
    else {
      context.status = StatusCode.NOT_FOUND;
    }
  }
  async createEntity(context: ParameterizedContext): Promise<T> {
    if (this.getCreatePermission() !== undefined) {
      await this.getAuthorizationService().userHasRight(context.state.user, this.getCreatePermission());
    }
    const errorMessage = await this.entityCanBeCreated(context.request.body as CreateRequest);
    if (errorMessage !== null) {
      throw new ErrorBase(errorMessage, StatusCode.BAD_REQUEST);
    }
    const entity = await this.getRepository().save(await this.modifyEntityForCreate(context.request.body as CreateRequest));
    context.status = StatusCode.CREATED;
    context.body = {
      success: true,
      entity
    };
    return entity;
  }
  async editEntity(context: ParameterizedContext): Promise<void> {
    if (this.getEditPermission() !== undefined) {
      await this.getAuthorizationService().userHasRight(context.state.user, this.getEditPermission());
    }
    const entity = await this.getById(context);
    if (entity) {
      const errorMessage = await this.entityCanBeEdited(entity, context.request.body as EditRequest);
      if (errorMessage !== null) {
        throw new ErrorBase(errorMessage, StatusCode.BAD_REQUEST);
      }
      await this.getRepository().save(await this.modifyEntityForUpdate(entity, context.request.body as EditRequest));
      context.status = StatusCode.OK
      context.body = <BaseResponse>{
        success: true
      };
    }
    else {
      context.status = StatusCode.NOT_FOUND;
    }
  }
  async deleteEntity(context: ParameterizedContext) {
    if (this.getDeletePermission() !== undefined) {
      await this.getAuthorizationService().userHasRight(context.state.user, this.getDeletePermission());
    }
    const entity = await this.getById(context);
    if (entity) {
      const errorMessage = await this.entityCanBeDeleted(entity)
      if (errorMessage !== null) {
        throw new ErrorBase(errorMessage, StatusCode.BAD_REQUEST);
      }
      await this.delete(entity);
      context.status = StatusCode.OK;
      context.body = <BaseResponse>{
        success: true
      };
    }
    else {
      context.status = StatusCode.NOT_FOUND;
    }
  }
  protected async delete(entity: T) {
    await this.getRepository().delete(entity);
  }
  getEntities(context: ParameterizedContext): Promise<T[]> {
    return this.getRepository().getAll();
  }
  getById(context: ParameterizedContext): Promise<T> {
    return this.getRepository().getById(context.params.id);
  }

  protected getListPermission(): PermissionType | undefined {
    return undefined;
  }
  protected getViewPermission(): PermissionType | undefined {
    return undefined;
  }
  protected getCreatePermission(): PermissionType | undefined {
    return undefined;
  }
  protected getEditPermission(): PermissionType | undefined {
    return undefined;
  }
  protected getDeletePermission(): PermissionType | undefined {
    return undefined;
  }

  protected shouldRegisterListEndpoint(): boolean {
    return true;
  }
  protected shouldRegisterViewEndpoint(): boolean {
    return true;
  }
  protected shouldRegisterCreateEndpoint(): boolean {
    return true;
  }
  protected shouldRegisterEditEndpoint(): boolean {
    return true;
  }
  protected shouldRegisterDeleteEndpoint(): boolean {
    return true;
  }
  protected async entityCanBeCreated(body: CreateRequest): Promise<string | null> {
    return null;
  }
  protected async entityCanBeEdited(entity: T, body: EditRequest): Promise<string | null> {
    return null;
  }
  protected async entityCanBeDeleted(entity: T): Promise<string | null> {
    return null;
  }
  protected async modifyEntityForCreate(body: CreateRequest): Promise<DeepPartial<T>> {
    return body as DeepPartial<T>;
  }
  protected async modifyEntityForUpdate(entity: T, body: EditRequest): Promise<T> {
    return entity;
  }
}