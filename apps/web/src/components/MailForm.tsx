import { Button, buttonVariants } from "@jenn.fyi/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@jenn.fyi/ui/components/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@jenn.fyi/ui/components/drawer";
import { useAppForm } from "@jenn.fyi/ui/components/form";
import { useMediaQuery } from "@jenn.fyi/ui/hooks/use-media-query";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePostHog } from "@posthog/react";
import React from "react";
import { toast } from "sonner";
import { sendEmail } from "@/actions/mail";
import { formSchema } from "@/lib/schema";

export interface MailFormProps {
	show?: boolean;
	onShowChange?: (show: boolean) => void;
}

export const MailFormInner = ({
	show = false,
	onShowChange,
}: MailFormProps) => {
	const [verified, setVerified] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const posthog = usePostHog();

	const posthogId = posthog.get_distinct_id();

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
			"cf-turnstile-response": "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				posthog?.capture("sending_email");
				const res = await sendEmail({ data: { ...value, posthogId } });
				setMessage(res.message);
			} catch (error) {
				posthog?.capture("email_send_error");
				console.log("handler fail");
				console.error(error);
			}
			//  TODO: Finish getting all message and error responses back in
		},
	});
	const formRef = React.useRef<HTMLFormElement>(null);

	const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

	const reset = React.useCallback(() => {
		form.reset();
		onShowChange?.(false);
		toast("Message sent!");
	}, [form, onShowChange]);

	React.useEffect(() => {
		if (message === "Sent") {
			reset();
		}
	}, [message, reset]);

	const handleOpenChange = React.useCallback(
		(open: boolean) => {
			if (!open) {
				posthog?.capture("email_form_closed");
				form.setFieldValue("cf-turnstile-response", "");
				setVerified(false);
				setMessage("");
			}
			onShowChange?.(open);
		},
		[form, onShowChange, posthog.capture],
	);

	return (
		<div>
			<form
				ref={formRef}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.AppField
					name="name"
					children={(field) => (
						<field.Field>
							<field.Label>Name</field.Label>
							<field.Input
								placeholder="Name"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(",")}</em>
							) : null}
						</field.Field>
					)}
				/>
				<form.AppField
					name="email"
					children={(field) => (
						<field.Field>
							<field.Label>Email</field.Label>
							<field.Input
								placeholder="your@email.here"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(",")}</em>
							) : null}
						</field.Field>
					)}
				/>
				<form.AppField
					name="subject"
					children={(field) => (
						<field.Field>
							<field.Label>Subject</field.Label>
							<field.Input
								placeholder="Subject"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(",")}</em>
							) : null}
						</field.Field>
					)}
				/>
				<form.AppField
					name="message"
					children={(field) => (
						<field.Field>
							<field.Label htmlFor={field.name}>Message</field.Label>
							<field.Textarea
								placeholder="How can I help you?"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors.length ? (
								<em>{field.state.meta.errors.join(",")}</em>
							) : null}
						</field.Field>
					)}
				/>
				<form.AppField
					name="cf-turnstile-response"
					children={(field) => (
						<field.Field className="flex justify-center items-center mx-auto w-full">
							{siteKey ? (
								<div className="flex justify-center w-full mt-4">
									<Turnstile
										siteKey={siteKey}
										onError={(error) => {
											posthog?.capture("turnstile_error", { error });
											console.error("Turnstile error:", error);
											toast.error(
												"CAPTCHA verification failed. Please try again.",
											);
										}}
										onExpire={() => {
											posthog?.capture("turnstile_expired");
											setVerified(false);
											field.handleChange("");
										}}
										onSuccess={(token) => {
											posthog?.capture("turnstile_success");
											setVerified(true);
											field.handleChange(token);
										}}
									/>
								</div>
							) : (
								<em>CAPTCHA is not configured.</em>
							)}
						</field.Field>
					)}
				/>
				<div className="flex justify-end gap-2 mt-2">
					<Button
						className="w-full"
						type="submit"
						variant="default"
						disabled={!verified}
					>
						Send
					</Button>
				</div>
			</form>
		</div>
	);
};

export const MailForm = ({ show, onShowChange }: MailFormProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	if (isDesktop) {
		return (
			<Dialog open={show} onOpenChange={onShowChange}>
				<DialogContent className="sm:max-w-106">
					<DialogHeader>
						<DialogTitle>Email Jennifer</DialogTitle>
						<DialogDescription>Send me an email</DialogDescription>
					</DialogHeader>
					<MailFormInner onShowChange={onShowChange} />
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<Drawer open={show} onOpenChange={onShowChange}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Email Jennifer</DrawerTitle>
						<DrawerDescription>Send me an email</DrawerDescription>
					</DrawerHeader>
					<MailFormInner onShowChange={onShowChange} />
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}
};
