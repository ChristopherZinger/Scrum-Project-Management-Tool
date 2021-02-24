import { IEmailTemplate } from "../email-service";
import { v4 } from "uuid";
import { redis } from "../../setup-redis-and-express-session";

export const passwordChangeTokenPrefix = "password-change-token-";

const createPasswordChangeUrl = async (userId: number) => {
	const token = v4();
	await redis.set(
		passwordChangeTokenPrefix + token,
		userId,
		"ex",
		60 * 60 * 24
	); // 1day

	return `http://localhost:3000/reset-password/${token}`;
};

export const createChangePasswordEmail = (
	userEmail: string,
	userId: number
): IEmailTemplate => {
	const url = createPasswordChangeUrl(userId);
	return {
		from: '"Automatic Email" <foo@example.com>',
		to: `${userEmail}`,
		subject: "Chage Password",
		text:
			"You requested password reset. Click on link below and enter new password.",
		html: `<a href="${url}">Activate account</a>`
	};
};
