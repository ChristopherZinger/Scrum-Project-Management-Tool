import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ArgumentValidationError } from "type-graphql";
import { ApolloError } from "apollo-server-express";

export const formatErrors = (error: GraphQLError): GraphQLFormattedError => {
	if (error instanceof ApolloError) {
		return error;
	}

	if (error.originalError instanceof ArgumentValidationError) {
		return addMetaDataForErrors(error);
	}

	return error;
};

function addMetaDataForErrors(error: GraphQLError): GraphQLError {
	if (error.originalError instanceof ArgumentValidationError) {
		return {
			...error,
			extensions: {
				code: "ARGUMENT_VALIDATION_ERROR",
				type: "ArgumentValidationError",
				inputErrors: error.originalError.validationErrors
			}
		};
	}

	return error;
}
