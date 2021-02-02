import { v4 } from "uuid";
import { redis } from "../setup-redis-and-express-session";

export const createConfirmationUrl = async (userId: number) => {
	const token = v4();
	await redis.set(token, userId, "ex", 1000 * 60 * 60 * 24); // 1day

	return `http://localhost:3000/user/confirm/${token}`;
};
