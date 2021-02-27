import { FindOptions } from "sequelize";
import { ContextType } from "./../../../core/context/context-type";
import { BaseRepository } from "../../../core/base-repository";
import { UserProfile } from "./UserProfile.model";
import { injectable } from "inversify";
import { Company } from "../../company/model/Company.model";
import { User } from "../../user/model/User.model";

@injectable()
export class UserProfileRepository extends BaseRepository<UserProfile> {
	protected model = UserProfile;

	public async findTeammates(
		context: ContextType,
		options?: FindOptions
	): Promise<UserProfile[]> {
		if (!context.session.user) {
			console.error("Session is missing the user.");
			return [];
		}

		return await this.model.findAll({
			include: [
				{ model: Company, where: { id: context.session.user.companyId } },
				{ model: User }
			],
			...options
		});
	}
}
