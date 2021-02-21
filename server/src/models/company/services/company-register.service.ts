import { ApolloError } from "apollo-server-express";
import { CompanyRepository } from "./../model/Company.repository";
import { injectable } from "inversify";
import { RegisterCompanyInputType } from "./../graphql/register-company.mutation";
import { Company } from "../model/Company.model";

@injectable()
export class CompanyRegisterService {
	public constructor(private companyRepository: CompanyRepository) {}

	public async register(data: RegisterCompanyInputType) {
		const emailIsTaken = await this.companyRepository.emailIsTaken(data.email);
		if (emailIsTaken) {
			throw new ApolloError("This email is taken", "EMAIL_TAKEN");
		}
		const company = new Company();
		company.email = data.email;
		company.name = data.name;
		company.city = data.city;
		company.street = data.street;
		company.buildingNumber = data.buildingNumber;
		company.zipCode = data.zipCode;

		return await this.companyRepository.save(company);
	}
}
