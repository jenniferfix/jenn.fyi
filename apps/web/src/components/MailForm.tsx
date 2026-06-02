import { Button } from "@jenn.fyi/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@jenn.fyi/ui/components/dialog";
import { useAppForm } from "@jenn.fyi/ui/components/form";
import { Turnstile } from "@marsidev/react-turnstile";
import { useServerFn } from "@tanstack/react-start";
import React from "react";
import { toast } from "sonner";
import { onSubmitHandler } from "@/actions/mail";
import { formSchema } from "@/lib/schema";

export interface MailFormProps {
	show?: boolean;
	onShowChange?: (show: boolean) => void;
}

export const MailForm = ({ show = false, onShowChange }: MailFormProps) => {
	const submitHandler = useServerFn(onSubmitHandler);
	const [verified, setVerified] = React.useState(false);
	const [sent, setSent] = React.useState(false);
	const [message, setMessage] = React.useState("");

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
			"cf-turnstile-response": "",
		},
		validators: {
			onSubmit: formSchema.parse,
		},
		onSubmit: async ({ value }) => {
			try {
				const res = await submitHandler({ data: value });
				setMessage(res.message);
			} catch (error) {
				console.error(error);
			}
			//  TODO: Finish getting all message and error responses back in
		},
	});
	const formRef = React.useRef<HTMLFormElement>(null);

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

	return (
		<React.Fragment>
			<Dialog open={show} onOpenChange={onShowChange}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Email Jennifer</DialogTitle>
						<DialogDescription>Send me an email</DialogDescription>
					</DialogHeader>

					<div>
						{/* <Form {...form}> */}
						{/*   {state?.message !== '' && */}
						{/*     state?.message !== 'Sent' && */}
						{/*     !state.issues && <div className="">{state.message}</div>} */}
						{/*   {state?.issues && ( */}
						{/*     <div className=""> */}
						{/*       <ul> */}
						{/*         {state.issues.map((issue) => ( */}
						{/*           <li key={issue} className=""> */}
						{/*             {issue} */}
						{/*           </li> */}
						{/*         ))} */}
						{/*       </ul> */}
						{/*     </div> */}
						{/*   )} */}
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
									<field.Field className="flex justify-center">
										<Turnstile
											siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY!}
											onError={(error) => {
												console.error("Turnstile error:", error);
												toast.error(
													"CAPTCHA verification failed. Please try again.",
												);
											}}
											onSuccess={(token) => {
												setVerified(true);
												field.handleChange(token);
											}}
										/>
									</field.Field>
								)}
							/>
							<div className="flex justify-end gap-2 mt-2">
								<DialogClose>Cancel</DialogClose>
								<Button type="submit" variant="default" disabled={!verified}>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
};
