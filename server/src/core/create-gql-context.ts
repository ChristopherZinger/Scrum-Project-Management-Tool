import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { User } from "../models/user/model/User.model";

export interface ContextType extends AuthorizationContext {
	// dataloaders: ReturnType<typeof createDataLoaders>;
	request: Request;
	response: Response;
}

export interface AuthorizationContext {
	userId: number | null;
}

export async function createGQLContext(request, response) {
	let userId;

	// find user by token and email

	const authorizationContext: AuthorizationContext = {
		userId
	};

	const x = request.session;

	const context: ContextType = {
		...authorizationContext,
		request,
		response
	};

	return context;
}
