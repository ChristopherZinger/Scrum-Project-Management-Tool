import { Session, SessionData } from "express-session";
import { UserRole } from "../../models/user/type-guards";
import { AuthorizationContext } from "../authorization/authorization-context";
import { Response } from "express";

export type SessionUserType = {
	id: number;
	email: string;
	role: UserRole;
	emailConfirmed: Date | null;
	isActive: boolean;
	removedAt?: Date;
};

// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
declare module "express-session" {
	export interface SessionData {
		user?: SessionUserType;
	}
}

export interface ContextType extends AuthorizationContext {
	// dataloaders: ReturnType<typeof createDataLoaders>;
	response: Response;
	session: Session & Partial<SessionData> & { user?: SessionUserType };
}
