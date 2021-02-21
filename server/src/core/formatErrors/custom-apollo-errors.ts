import { ApolloError } from "apollo-server-express";
import { customErrorCodes } from "./custom-error-codes";

const message = (
	message: string,
	replaceMessage?: string,
	appendMessage?: string
) => replaceMessage || message + appendMessage || "";

function customApolloErrors() {
	return {
		// AUTH
		invalidToken: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message("Given token is invalid", replaceMessage, appendMessage),
				customErrorCodes.INVALID_TOKEN
			);
		},
		sessionError: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message("Session Error.", replaceMessage, appendMessage),
				customErrorCodes.SESSION_ERROR
			);
		},
		wrongCredentials: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message("Incorrect credentials.", replaceMessage, appendMessage),
				customErrorCodes.WRONG_CREDENTIALS
			);
		},

		//MISSING
		userMissingForId: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message(
					"User with this id does not exist. ",
					replaceMessage,
					appendMessage
				),
				customErrorCodes.USER_MISSING_FOR_ID
			);
		},
		userMissingForEmail: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
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
			return new ApolloError(
				message(
					"Could not load user's full data. ",
					replaceMessage,
					appendMessage
				),
				customErrorCodes.COULD_NOT_LOAD_USER_DATA
			);
		},

		// VALIDATION
		operationFobridden: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message("Operation fobridden. ", replaceMessage, appendMessage),
				customErrorCodes.OPERATION_FOBRIDDEN
			);
		},

		// VALIDATION
		somethingWentWrong: (replaceMessage?: string, appendMessage?: string) => {
			return new ApolloError(
				message("Something went wrong. ", replaceMessage, appendMessage),
				customErrorCodes.SOMETHING_WENT_WRONG
			);
		}
	};
}

export default customApolloErrors();
