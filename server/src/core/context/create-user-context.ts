import { ContextType, SessionUserType } from "./context-type";

export function createUserContext(
	context: ContextType,
	updatedUserProperties: SessionUserType
): boolean {
	if (!context.session.user) {
		context.session.user = updatedUserProperties;
		return true;
	}

	console.warn("Session User already exists");
	return false;
}
