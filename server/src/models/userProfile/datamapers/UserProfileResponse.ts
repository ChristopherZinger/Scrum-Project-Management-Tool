import { TUserProfileWithUser, IUserProfileResponse } from "../type-guards";

export class UserProfileDM {
	public toUserProfileResponse(
		userProfileWithUser: TUserProfileWithUser
	): IUserProfileResponse {
		return {
			profileId: userProfileWithUser.id,
			firstname: userProfileWithUser.firstname,
			lastname: userProfileWithUser.lastname,
			email: userProfileWithUser.user.email,
			isActive: userProfileWithUser.user.isActive,
			emailConfirmed: userProfileWithUser.user.emailConfirmed
		};
	}
}
