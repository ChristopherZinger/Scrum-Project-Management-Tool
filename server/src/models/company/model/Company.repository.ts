import { Company } from "./Company.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";

@injectable()
export class CompanyRepository extends BaseRepository<Company> {
	protected model = Company;

	public async emailIsTaken(email: string): Promise<boolean> {
		const emailIsTaken = await this.model.findOne({ where: { email } });
		return !!emailIsTaken;
	}
}
