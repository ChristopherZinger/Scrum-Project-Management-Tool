export enum Permission {
	// Account
	READ_OWN_ACCOUNT = "READ_OWN_ACCOUNT",
	READ_ALL_ACCOUNT = "READ_ALL_ACCOUNT",
	UPDATE_OWN_ACCOUNT = "UPDATE_OWN_ACCOUNT",
	UPDATE_ALL_ACCOUNT = "UPDATE_ALL_ACCOUNT",
	DELETE_OWN_ACCOUNT = "DELETE_OWN_ACCOUNT",
	DELETE_ALL_ACCOUNT = "DELETE_ALL_ACCOUNT"
}

export function buildPermissionsForBaseUser() {
	const permissions: Permission[] = [
		Permission.READ_OWN_ACCOUNT,
		Permission.UPDATE_OWN_ACCOUNT,
		Permission.DELETE_OWN_ACCOUNT
	];
	return permissions;
}

export function buildPermissionsForAdmin() {
	const permissions: Permission[] = [
		Permission.READ_OWN_ACCOUNT,
		Permission.UPDATE_OWN_ACCOUNT,
		Permission.DELETE_OWN_ACCOUNT,
		Permission.READ_ALL_ACCOUNT,
		Permission.UPDATE_ALL_ACCOUNT,
		Permission.DELETE_ALL_ACCOUNT
	];
	return permissions;
}

// stores permissions for the user and is injected where needed
// @injectable()
export class PermissionList {
	private permissions: Permission[] = [];

	public addPermissions(permissions: Permission[]) {
		this.permissions = this.permissions.concat(permissions);
	}

	public getPermissions(): Permission[] {
		return this.permissions;
	}

	public has(permission: Permission) {
		return this.permissions.includes(permission);
	}

	public hasSome(permissions: Permission[]) {
		return permissions.some(permission => this.has(permission));
	}
}
