import { ContextType } from "./../../../core/context/context-type";
import { Company } from "./Company.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";
import { UserProfile } from "../../userProfile/model/UserProfile.model";
import { User } from "../../user/model/User.model";

@injectable()
export class CompanyRepository extends BaseRepository<Company> {
	protected model = Company;

	public async emailIsTaken(email: string): Promise<boolean> {
		const emailIsTaken = await this.model.findOne({ where: { email } });
		return !!emailIsTaken;
	}

	public async findForUser(context: ContextType): Promise<Company | null> {
		const user = context.session.user;

		if (!user) {
			throw customApolloErrors.sessionError();
		}

		return await this.model.findOne({
			include: [
				{
					model: UserProfile,
					include: [{ model: User, where: { id: user.id } }]
				}
			]
		});
	}
}
