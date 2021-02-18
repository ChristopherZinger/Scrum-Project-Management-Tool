import { User } from "./model/User.model";
import { UserProfile } from "../userProfile/model/UserProfile.model";

// if you add new roles here remember to create migration that reflects it in db.
export enum UserRole {
	ADMIN = "ADMIN",
	BASE_USER = "BASE_USER",
	STAFF = "STAFF"
}

export type UserWithUserProfile = User & { profile: UserProfile };

export function userHasUserProfile(user: User): user is UserWithUserProfile {
	return user.profile !== undefined;
}
