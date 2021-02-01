import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { AuthorizationContext } from "./authorization/authorization-context";
import {
	PermissionList,
	buildPermissionsForBaseUser,
	buildPermissionsForAdmin
} from "./authorization/permissions";
import { AccessGroup } from "./authorization/access-groups";
import { UserRole } from "../models/user/model/User.model";

export interface ContextType extends AuthorizationContext {
	// dataloaders: ReturnType<typeof createDataLoaders>;
	session: Session & Partial<SessionData>;
}

export async function createGQLContext(request: Request, response: Response) {
	let userId, accessGroup;
	const permissionList = new PermissionList();

	// find user by token and email
	if (request.session.user) {
		userId = request.session.user.id;

		// build permissions and access groups
		switch (request.session.user.role) {
			case UserRole.BASE_USER:
				permissionList.addPermissions(buildPermissionsForBaseUser());
				accessGroup = AccessGroup.BASE_USER;
				break;

			case UserRole.ADMIN:
				permissionList.addPermissions(buildPermissionsForAdmin());
				accessGroup = AccessGroup.STAFF;
				break;
		}
	}

	const authorizationContext: AuthorizationContext = {
		userId: userId || null,
		permissionList,
		accessGroup: accessGroup || null
	};

	const context: ContextType = {
		...authorizationContext,
		session: request.session
	};

	return context;
}
