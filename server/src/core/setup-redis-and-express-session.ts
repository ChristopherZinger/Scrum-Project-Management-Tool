import { Express } from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

export function setupRedisAndExpressSession(app: Express) {
	const redis = new Redis();
	const RedisStore = connectRedis(session);
	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: "qid",
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
			}
		} as any)
	);
}
