export const createEmail = (userEmail: string, url: string) => {
	return {
		from: '"Automatic Email" <foo@example.com>',
		to: `${userEmail}`,
		subject: "Chage Password",
		text:
			"You requested password reset. Click on link below and enter new password.",
		html: `<a href="${url}">Activate account</a>`
	};
};
