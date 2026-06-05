import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { getPostHogClient } from "@/lib/posthog/server";
import { formSchema } from "@/lib/schema";

export const sendEmail = createServerFn({ method: "POST" })
	.inputValidator(formSchema)
	.handler(async (ctx) => {
		const parsed = formSchema.safeParse(ctx.data);
		const resend = new Resend(process.env.RESEND_API_KEY);
		const posthog = getPostHogClient();

		if (!parsed.success) {
			posthog.capture({
				event: "email_send.server_fn.invalid_form_data",
			});
			return {
				message: "Invalid form data",
			};
		}

		posthog.capture({
			event: "email_send.server_fn.start",
			distinctId: parsed.data?.posthogId,
			properties: {
				name: parsed.data.name,
				email: parsed.data.email,
				subject: parsed.data.subject,
				message: parsed.data.message,
			},
		});

		const validateHuman = async (token: string): Promise<boolean> => {
			const secret = process.env.TURNSTILE_SECRET_KEY!;
			const sendData = new FormData();
			sendData.append("secret", secret);
			sendData.append("response", token);
			const response = await fetch(
				`https://challenges.cloudflare.com/turnstile/v0/siteverify`,
				{
					body: sendData,
					method: "POST",
				},
			);
			const data = await response.json();
			posthog.capture({
				event: "email_send.turnstile_challenge_result",
				distinctId: parsed.data?.posthogId,
				properties: { ...data },
			});
			return data.success;
		};

		// lets verify the cloudflare token
		const token = ctx.data["cf-turnstile-response"];
		if (!token) return { message: "Invalid token" };

		try {
			const isHuman = await validateHuman(token.toString());
			if (!isHuman) {
				return { message: "Error, maybe not human" };
			}
		} catch (error) {
			console.error(error);
		}

		try {
			const { data, error } = await resend.emails.send({
				from: `${parsed.data.name} <no-reply@callcat.io>`,
				to: ["jenniferashleyfix@gmail.com"],
				subject: `WebForm: ${parsed.data.subject}`,
				react: EmailTemplate({
					name: parsed.data.name,
					email: parsed.data.email,
					subject: parsed.data.subject,
					message: parsed.data.message,
				}),
			});

			if (error) {
				posthog.capture({
					event: "email_send.server_fn.resend.error",
					distinctId: parsed.data.posthogId,
					properties: {
						message: error.message,
						name: error.name,
						statusCode: error.statusCode,
					},
				});
				return {
					message:
						"Email send error, please try again. Error: " + error.message,
				};
			}

			posthog.capture({
				event: "email_send.server_fn.email_sent",
				distinctId: parsed.data.posthogId,
				properties: {
					resendId: data.id,
				},
			});
		} catch (error) {
			// TODO: Better error message
			posthog.capture({
				event: "email_send.server_fn.error",
				distinctId: parsed.data.posthogId,
				properties: {},
			});
			console.error(error);
		}

		return { message: "Sent" };
	});
