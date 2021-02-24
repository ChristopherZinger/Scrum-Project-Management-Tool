export const CONST = {
	cookies: {
		sessionCookieName: "sessionId",
		sessionCookieOptions: {
			path: "/"
		}
	},

	redisPrefix: {
		pendingInvitationList: (companyId: number) =>
			"pending_invitation_list_" + companyId
	}
};
