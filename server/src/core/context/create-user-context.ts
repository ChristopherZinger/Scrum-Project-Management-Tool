import { ContextType, SessionUserType } from "./context-type";

export function createUserContext(
	context: ContextType,
	user: SessionUserType
): boolean {
	if (!context.session.user) {
		context.session.user = user;
		return true;
	}

	console.warn("Session User already exists");
	return false;
}
