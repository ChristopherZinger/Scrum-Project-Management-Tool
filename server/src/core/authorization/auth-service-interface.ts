import { AuthorizationContext } from "./authorization-context";

export interface AuthServiceInterface<TModel> {
	canCreate?(context: AuthorizationContext, entity: TModel): boolean;
	canRead?(context: AuthorizationContext, entity: TModel): boolean;
	canUpdate?(context: AuthorizationContext, entity: TModel): boolean;
	canDelete?(context: AuthorizationContext, entity: TModel): boolean;
}
