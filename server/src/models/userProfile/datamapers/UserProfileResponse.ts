import { IUserProfileResponse } from "../type-guards";
import { UserProfile } from "../model/UserProfile.model";
import { User } from "../../user/model/User.model";

export class UserProfileDM {
	public createUserProfileResponse(
		user: User,
		profile: UserProfile
		//company: Company, // TODO : probably company will be in the response too
	): IUserProfileResponse {
		return {
			profileId: profile.id,
			firstname: profile.firstname,
			lastname: profile.lastname,
			email: user.email,
			isActive: user.isActive,
			emailConfirmed: user.emailConfirmed
		};
	}
}
