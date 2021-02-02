import { v4 } from "uuid";
import { redis } from "../setup-redis-and-express-session";

export const emailConfirmationTokenPrefix = "confirmation-token-";
export const passwordChangeTokenPrefix = "password-change-token-";

export const createConfirmationUrl = async (userId: number) => {
	const token = v4();
	await redis.set(
		emailConfirmationTokenPrefix + token,
		userId,
		"ex",
		60 * 60 * 24
	); // 1day

	return `http://localhost:3000/user/confirm/${token}`;
};

export const createPasswordChangeUrl = async (userId: number) => {
	const token = v4();
	await redis.set(
		passwordChangeTokenPrefix + token,
		userId,
		"ex",
		60 * 60 * 24
	); // 1day

	return `http://localhost:3000/reset-password/${token}`;
};
