import { ProjectResponseDM } from "./../datamappers/ProjectResponse.dm";
import { ProjectRepository } from "./../model/Project.repository";
import { Field, InputType } from "type-graphql";
import { ProjectResponseType } from "./ProjectResponse.type";
import { Arg, Authorized, Mutation, Resolver, Int } from "type-graphql";
import { injectable } from "inversify";
import { ApolloError } from "apollo-server-express";

@InputType()
class UpdateProjectInputType {
	@Field(() => Int)
	projectId!: number;

	@Field()
	title?: string;

	@Field()
	pid?: string;
}

@injectable()
@Resolver()
export class UpdateProjectMutation {
	constructor(
		private projectRepository: ProjectRepository,
		private projectResponseDM: ProjectResponseDM
	) {}
	@Authorized()
	@Mutation(() => ProjectResponseType)
	public async updateProject(
		@Arg("data") data: UpdateProjectInputType
	): Promise<ProjectResponseType> {
		const project = await this.projectRepository.findById(data.projectId);

		if (!project) {
			throw new ApolloError("Can't find requested project", "PROJECT_MISSING");
		}

		project.title = data.title || project.title;
		project.pid = data.pid || project.pid;

		const updatedProject = await this.projectRepository.save(project);

		if (!updatedProject) {
			throw new ApolloError(
				"Could not save the changes",
				"PROJECT_UPDATE_FAIL"
			);
		}

		return this.projectResponseDM.createProjectResponse(updatedProject);
	}
}
