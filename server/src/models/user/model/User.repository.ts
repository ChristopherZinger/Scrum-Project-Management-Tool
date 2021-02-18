import { BaseRepository } from "../../../core/base-repository";
import { User } from "./User.model";
import { injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<User> {
	protected model = User;

	public async emailIsTaken(email: string): Promise<boolean> {
		const emailIsTaken = await this.model.findOne({ where: { email } });
		return !!emailIsTaken;
	}
}
