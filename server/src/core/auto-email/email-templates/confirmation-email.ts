import { IEmailTemplate } from "../email-service";
import { v4 } from "uuid";
import { redis } from "../../setup-redis-and-express-session";
import { CONST } from "../../../core/CONST";

export const emailConfirmationTokenPrefix = "confirmation-token-";

const createConfirmationUrl = async (userId: number) => {
	const token = v4();
	await redis.set(
		CONST.redisPrefix.emailConfirmationTokenPrefix + token,
		userId,
		"ex",
		60 * 60 * 24
	); // 1day

	return `http://localhost:3000/user/confirm/${token}`;
};

export const createConfirmationEmail = async (
	userEmail: string,
	userId: number
): Promise<IEmailTemplate> => {
	const url = await createConfirmationUrl(userId);

	return {
		from: '"Automatic Email" <foo@example.com>',
		to: `${userEmail}`,
		subject: "Confirm Your Email To Active Account",
		text:
			"Thans for signing up to our platform .Click on the link to activate your account",
		html: `<a href="${url}">Activate account</a>`
	};
};
