import { Story } from "./Story.model";
import { BaseRepository } from "../../../core/base-repository";
import { injectable } from "inversify";

@injectable()
export class StoryRepository extends BaseRepository<Story> {
	protected model = Story;
}
