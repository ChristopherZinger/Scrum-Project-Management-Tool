import { RegisterCompanyInputType } from "./../graphql/register-company.mutation";
import { Company } from "./Company.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";

@injectable()
export class CompanyRepository extends BaseRepository<Company> {
	protected model = Company;

	public async register(data: RegisterCompanyInputType): Promise<Company> {
		const company = new Company();
		company.email = data.email;
		company.name = data.name;
		company.city = data.city;
		company.street = data.street;
		company.buildingNumber = data.buildingNumber;
		company.zipCode = data.zipCode;

		return await this.save(company);
	}
}
