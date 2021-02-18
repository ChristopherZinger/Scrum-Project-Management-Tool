import { BaseRepository } from "../../../core/base-repository";
import { UserProfile } from "./UserProfile.model";
import { injectable } from "inversify";

@injectable()
export class UserProfileRepository extends BaseRepository<UserProfile> {
	protected model = UserProfile;
}
