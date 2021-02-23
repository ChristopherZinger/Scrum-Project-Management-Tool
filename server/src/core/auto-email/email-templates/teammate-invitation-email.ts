import { IEmailTemplate } from "../email-service";
import { redis } from "../../setup-redis-and-express-session";
import { v4 } from "uuid";

const teammateInvitationPrefix = "teammate_invitation_";

const createTeammateInvitationUrl = async (email: string) => {
	const token = v4();
	await redis.set(
		teammateInvitationPrefix + token,
		email,
		"ex",
		60 * 60 * 24 * 30
	); // 30 days

	return `http://localhost:3000/register-witch-invitation/${token}`;
};

export const createTeammageInvitationEmail = async (
	userEmail: string,
	companyName: string
): Promise<IEmailTemplate> => {
	const url = await createTeammateInvitationUrl(userEmail);

	return {
		from: '"Automatic Email" <foo@example.com>',
		to: `${userEmail}`,
		subject: `${companyName} - Invitation`,
		text: `Hi, you have been invited to join ${companyName} at on https://scrum-arch-service.com/`,
		html: `<a href="${url}">Join!</a>`
	};
};
