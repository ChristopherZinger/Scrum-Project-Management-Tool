const nodemailer = require("nodemailer");

export interface IEmailTemplate {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
}

// TODO: This will be removed and EmailService class will handle emails
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

export class EmailService {
	private testAccount: any;
	private transporter: any;

	public constructor() {
		(async () => {
			this.testAccount = await nodemailer.createTestAccount();
			this.transporter = nodemailer.createTransport({
				host: "smtp.ethereal.email",
				port: 587,
				secure: false,
				auth: {
					user: this.testAccount.user,
					pass: this.testAccount.pass
				}
			});
		})();
	}

	public async send(options: IEmailTemplate) {
		try {
			const info = await this.transporter.sendMail(options);

			console.log("Message sent: %s", info.messageId);

			// Preview only available when sending through an Ethereal account
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		} catch (err) {
			console.log(err);
		}
	}
}
