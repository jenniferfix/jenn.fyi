import { Button } from "@jenn.fyi/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@jenn.fyi/ui/components/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@jenn.fyi/ui/components/drawer";
import { useMediaQuery } from "@jenn.fyi/ui/hooks/use-media-query";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { MailFormInner } from "@/components/MailForm";
import { appStrings } from "@/lib/constants";

export const Route = createFileRoute("/send-email")({
	component: RouteComponent,
});

function RouteComponent() {
	const [open, setOpen] = React.useState(true);
	const navigate = Route.useNavigate();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleClose = React.useCallback(() => {
		setOpen(() => false);
	}, []);

	const handleClosed = React.useCallback(() => {
		navigate({ to: "/" });
	}, [navigate]);

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={(open) => {
					if (!open) {
						setOpen(false);
						setTimeout(handleClosed, 200);
					}
				}}
			>
				<DialogContent className="sm:max-w-106">
					<DialogHeader>
						<DialogTitle>{appStrings.EMAIL_FORM_TITLE}</DialogTitle>
						<DialogDescription>
							{appStrings.EMAIL_FORM_DESCRIPTION}
						</DialogDescription>
					</DialogHeader>
					<MailFormInner
						onShowChange={(open) => {
							if (!open) {
								handleClose();
							}
						}}
					/>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<Drawer
				open={open}
				onOpenChange={(open) => {
					if (!open) {
						handleClose();
					}
				}}
			>
				<DrawerContent
					onAnimationEnd={() => {
						if (!open) {
							handleClosed();
						}
					}}
					className="max-w-full"
				>
					<DrawerHeader>
						<DrawerTitle>{appStrings.EMAIL_FORM_TITLE}</DrawerTitle>
						<DrawerDescription>
							{appStrings.EMAIL_FORM_DESCRIPTION}
						</DrawerDescription>
					</DrawerHeader>
					<div className="mx-4">
						<MailFormInner
							onShowChange={(open) => {
								if (!open) {
									handleClose();
								}
							}}
						/>
					</div>
					<DrawerFooter>
						<Button
							variant="outline"
							onClick={() => {
								handleClose();
							}}
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}
}
