const nodemailer = require("nodemailer");

type CreateEmail = {
	from: string;
	to: string;
	subject: string;
	text: string;
	html: string;
};

export async function sendEmail(createEmail: CreateEmail) {
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

	// send mail with defined transport object
	const options = createEmail;

	const info = await transporter.sendMail(options);

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
