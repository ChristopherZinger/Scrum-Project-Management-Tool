import { IEmailTemplate } from "../email-service";
import { redis } from "../../setup-redis-and-express-session";
import { v4 } from "uuid";
import { CONST } from "../../../core/CONST";

const createTeammateInvitationUrl = async (
	email: string,
	companyId: number
): Promise<{ url: string; token: string }> => {
	const token = v4();
	await redis.set(
		CONST.redisPrefix.teammateInvitationPrefix + token,
		email,
		"ex",
		60 * 60 * 24 * 30
	); // 30 days

	return {
		url: `http://localhost:3000/register-with-invitation/${companyId}/${token}`,
		token
	};
};

export const createTeammageInvitationEmail = async (
	userEmail: string,
	companyName: string,
	companyId: number
): Promise<{ emailTemplate: IEmailTemplate; token: string }> => {
	const { url, token } = await createTeammateInvitationUrl(
		userEmail,
		companyId
	);

	return {
		emailTemplate: {
			from: '"Automatic Email" <foo@example.com>',
			to: `${userEmail}`,
			subject: `${companyName} - Invitation`,
			text: `Hi, you have been invited to join ${companyName} at on https://scrum-arch-service.com/`,
			html: `<a href="${url}">Join!</a>`
		},
		token
	};
};
