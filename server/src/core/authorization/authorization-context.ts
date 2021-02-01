import { PermissionList } from "./permissions";
import { AccessGroup } from "./access-groups";

export interface AuthorizationContext {
	userId: number | null;
	permissionList: PermissionList;
	accessGroup: AccessGroup | null;
}
