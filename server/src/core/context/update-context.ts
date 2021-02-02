import { ContextType, SessionUserType } from "./context-type";

export function updateContext(
	context: ContextType,
	updatedUserProperties: Partial<SessionUserType>
): boolean | null {
	if (!context.session.user) {
		console.error("Session does not have a user");
		return null;
	}

	context.session.user = {
		...context.session.user,
		...updatedUserProperties
	};

	return true;
}
