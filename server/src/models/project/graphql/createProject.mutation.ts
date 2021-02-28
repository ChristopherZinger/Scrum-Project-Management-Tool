import { ProjectResponseType } from "./ProjectResponse.type";
import { ProjectRepository } from "./../model/Project.repository";
import { ContextType } from "./../../../core/context/context-type";
import { injectable } from "inversify";
import {
	Resolver,
	Mutation,
	Ctx,
	Arg,
	Authorized,
	InputType,
	Field,
	Int
} from "type-graphql";
import customApolloErrors from "../../../core/formatErrors/custom-apollo-errors";

@InputType()
export class CreateProjectInputType {
	@Field(() => Int)
	projectId!: number;

	@Field()
	title!: string;

	@Field(() => String)
	pid?: string;
}

@injectable()
@Resolver()
export class createProjectMutation {
	public constructor(private projectRepository: ProjectRepository) {}
	@Authorized()
	@Mutation(() => ProjectResponseType)
	public async createProject(
		@Ctx() context: ContextType,
		@Arg("data") data: CreateProjectInputType
	): Promise<ProjectResponseType> {
		if (!context.session.user) {
			throw customApolloErrors.sessionError();
		}

		if (!context.session.user.companyId) {
			throw customApolloErrors.sessionError(
				undefined,
				"Session User does not have a company Id"
			);
		}

		const project = await this.projectRepository.create({
			...data,
			companyId: context.session.user.companyId
		});
		return project;
	}
}
