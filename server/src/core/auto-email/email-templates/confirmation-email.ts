import { IEmailTemplate } from "../email-service";

export const createConfirmationEmail = (
	userEmail: string,
	url: string
): IEmailTemplate => {
	return {
		from: '"Automatic Email" <foo@example.com>',
		to: `${userEmail}`,
		subject: "Confirm Your Email To Active Account",
		text:
			"Thans for signing up to our platform .Click on the link to activate your account",
		html: `<a href="${url}">Activate account</a>`
	};
};
