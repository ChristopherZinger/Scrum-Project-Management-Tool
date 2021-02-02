import { AuthChecker } from "type-graphql";
import { ContextType } from "../create-gql-context";
import { AccessGroup } from "./access-groups";
import { Permission } from "./permissions";

export const customAuthChecker: AuthChecker<
	ContextType,
	AccessGroup | Permission
> = ({ root, args, context, info }, accessGroupsAndPermissions) => {
	// noone is logged in
	if (!context.accessGroup || !context.session.user) {
		return false;
	}

	// User is signed in and no other UserAccessGroups or Permissions are required
	if (accessGroupsAndPermissions.length === 0 && context.accessGroup) {
		return true;
	}

	const [
		requiredPermissions,
		requiredAccessGroups
	] = dispatchAccessGroupsAndPermisions(accessGroupsAndPermissions);

	// user has all required premissions
	for (const requiredPermission of requiredPermissions) {
		if (!context.permissionList.has(requiredPermission)) {
			console.warn(
				`User with id ${context.session.user.id} doens't have required permissions `
			);
			return false;
		}
	}

	// user belong to one of required groups
	if (
		requiredAccessGroups.length > 0 &&
		!requiredAccessGroups.includes(context.accessGroup)
	) {
		console.warn(
			`User with id ${context.session.user.id} doens't belong to the required access group.`
		);
		return false;
	}

	return true;
};

const dispatchAccessGroupsAndPermisions = (
	accessGroupsAndPermissions: (Permission | AccessGroup)[]
): [Permission[], AccessGroup[]] => {
	const accesGroups: AccessGroup[] = [];
	const permissions: Permission[] = [];
	for (const item of accessGroupsAndPermissions) {
		if (item in Permission) {
			permissions.push(item as Permission);
		}
		if (item in AccessGroup) {
			accesGroups.push(item as AccessGroup);
		}
	}
	return [permissions, accesGroups];
};
