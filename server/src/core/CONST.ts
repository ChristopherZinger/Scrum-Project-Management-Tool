export const CONST = {
	cookies: {
		sessionCookieName: "sessionId",
		sessionCookieOptions: {
			path: "/"
		}
	},

	redisPrefix: {
		pendingInvitationList: (companyId: number) => {
			return "pending_invitation_list_" + companyId;
		},
		passwordChangeTokenPrefix: "password-change-token-",
		emailConfirmationTokenPrefix: "confirmation-token-",
		teammateInvitationPrefix: "teammate_invitation_"
	}
};
