const { Resend } = require("resend");
const resend = new Resend(process.env.API_KEY);

const resendEmail = async () => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["mohamedelsayedelrfaay@gmail.com"],
            subject: "hello world",
            html: "<strong>it works!</strong>",
        });

        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", data);
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
};

module.exports = resendEmail;