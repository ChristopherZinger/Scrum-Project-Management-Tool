import { SessionUserType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import { User } from "../../user/model/User.model";

@injectable()
export class UserSessionDM {
	public createUserSessionType(
		user: User,
		profile: UserProfile,
		companyId: number | null
	): SessionUserType {
		return {
			id: user.id,
			email: user.email,
			role: user.role,
			emailConfirmed: user.emailConfirmed,
			profileId: profile.id,
			isActive: user.isActive,
			removedAt: user.removedAt,
			companyId: companyId
		};
	}
}
