import { FindOptions } from "sequelize";
import { ContextType } from "./../../../core/context/context-type";
import { BaseRepository } from "../../../core/base-repository";
import { UserProfile } from "./UserProfile.model";
import { injectable } from "inversify";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
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
			throw customApolloErrors.sessionError();
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
