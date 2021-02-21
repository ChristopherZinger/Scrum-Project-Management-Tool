import { ApolloError } from "apollo-server-express";

export enum customErrorCodes {
	// AUTH
	INVALID_TOKEN = "INVALID_TOKEN",
	SESSION_ERROR = "SESSION_ERROR",

	// MISSING
	USER_MISSING_FOR_ID = "USER_MISSING_FOR_ID",
	USER_MISSING_FOR_EMAIL = "USER_MISSING_FOR_EMAIL",

	// LOADING ERRORS
	COULD_NOT_LOAD_USER_DATA = "COULD_NOT_LOAD_USER_DATA",

	// VALIDATION
	ARGUMENT_VALIDATION_ERROR = "ARGUMENT_VALIDATION_ERROR"
}

const message = (
	message: string,
	replaceMessage?: string,
	appendMessage?: string
) => replaceMessage || message + appendMessage || "";

export function CustomApolloError() {
	return {
		// AUTH
		invalidToken: (replaceMessage?: string, appendMessage?: string) => {
			throw new ApolloError(
				message("Given token is invalid", replaceMessage, appendMessage),
				customErrorCodes.INVALID_TOKEN
			);
		},
		sessionError: (replaceMessage?: string, appendMessage?: string) => {
			throw new ApolloError(
				message("Session Error.", replaceMessage, appendMessage),
				customErrorCodes.SESSION_ERROR
			);
		},

		//MISSING
		userMissingForId: (replaceMessage?: string, appendMessage?: string) => {
			throw new ApolloError(
				message(
					"User with this id does not exist. ",
					replaceMessage,
					appendMessage
				),
				customErrorCodes.USER_MISSING_FOR_ID
			);
		},
		userMissingForEmail: (replaceMessage?: string, appendMessage?: string) => {
			throw new ApolloError(
				message(
					"User with this email does not exist. ",
					replaceMessage,
					appendMessage
				),
				customErrorCodes.USER_MISSING_FOR_EMAIL
			);
		},

		// LOADING
		couldNotLoadUserData: (replaceMessage?: string, appendMessage?: string) => {
			throw new ApolloError(
				message(
					"Could not load user's full data. ",
					replaceMessage,
					appendMessage
				),
				customErrorCodes.COULD_NOT_LOAD_USER_DATA
			);
		}
	};
}
