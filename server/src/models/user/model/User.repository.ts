import { BaseRepository } from "../../../core/base-repository";
import { User } from "./User.model";
import { injectable } from "inversify";
import { FindOptions } from "sequelize";

@injectable()
export class UserRepository extends BaseRepository<User> {
	protected model = User;

	public async emailIsTaken(email: string): Promise<boolean> {
		const emailIsTaken = await this.model.findOne({ where: { email } });
		return !!emailIsTaken;
	}

	public async findByEmail(
		email: string,
		options?: FindOptions
	): Promise<User | null> {
		return await this.model.findOne({ where: { email }, ...options });
	}
}
