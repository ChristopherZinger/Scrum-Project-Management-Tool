const nodemailer = require("nodemailer");

export interface IEmailTemplate {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

export async function sendEmail(options: IEmailTemplate) {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	});

	const info = await transporter.sendMail(options);

	console.log("Message sent: %s", info.messageId);

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
