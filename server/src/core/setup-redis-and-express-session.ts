import { Express } from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { CONST } from "./CONST";

export const redis = new Redis();

export function setupRedisAndExpressSession(app: Express) {
	const RedisStore = connectRedis(session);
	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: CONST.cookies.sessionCookieName,
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			proxy: process.env.NODE_ENV === "production",
			cookie: {
				...CONST.cookies.sessionCookieOptions,
				// domain: "https://scrum-arch-service.com",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
			}
		} as any)
	);
}
