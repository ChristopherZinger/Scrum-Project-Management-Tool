import { UserProfile } from "./model/UserProfile.model";
import { User } from "../user/model/User.model";

export type TUserProfileWithUser = UserProfile & {
	user: User;
};

export interface IUserProfileResponse {
	profileId: number;
	firstname: string;
	lastname: string;
	email: string;
	isActive: boolean;
	emailConfirmed: Date | null;
}

export function userProfileHasUser(
	userProfile: UserProfile
): userProfile is UserProfile {
	return userProfile.user !== undefined;
}
