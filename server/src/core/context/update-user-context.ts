import { ContextType, SessionUserType } from "./context-type";

export function updateUserContext(
	context: ContextType,
	updatedUserProperties: Partial<SessionUserType>
): boolean {
	if (!context.session.user) {
		console.error("Session does not have a user");
		return false;
	}

	context.session.user = {
		...context.session.user,
		...updatedUserProperties
	};

	return true;
}
