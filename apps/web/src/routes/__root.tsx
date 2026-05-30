import { Toaster } from "@jenn.fyi/ui/components/sonner";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useCallback } from "react";
import { ContentContextProvider } from "@/components/ContentContext";
import FloatingTheme from "@/components/FloatingTheme";
import { MailForm } from "@/components/MailForm";
import { ThemeProvider } from "@/components/theme-provider";
import { homeSearchParams } from "@/lib/schema";
import appCss from "../globals.css?url";

export const Route = createRootRoute({
	validateSearch: homeSearchParams,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Jennifer's Home on the Internet",
			},
			{
				name: "description",
				content:
					"Jennifer's Home on the Internet. Jenn is a full stack developer working primarily with Typescript and React",
			},
		],
		links: [
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	notFoundComponent: () => (
		<main className="container mx-auto p-4 pt-16">
			<h1>404</h1>
			<p>The requested page could not be found.</p>
		</main>
	),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { path, useNavigate, useParams, useSearch } = Route;
	const { showContactForm } = useSearch();
	const navigate = useNavigate();
	const params = useParams();

	const handleMailFormShowChange = useCallback(
		(show: boolean) => {
			if (show)
				navigate({
					to: path,
					search: { showContactForm: true },
					params,
				});
			else
				navigate({
					to: path,
					search: { showContactForm: false },
					params,
				});
		},
		[navigate, params],
	);

	const toShow =
		showContactForm === undefined
			? false
			: showContactForm === null
				? true
				: showContactForm;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* <script */}
				{/*   crossOrigin="anonymous" */}
				{/*   src="//unpkg.com/react-scan/dist/auto.global.js" */}
				{/* ></script> */}
				<HeadContent />
			</head>
			<body>
				<ContentContextProvider>
					<ThemeProvider defaultTheme="dark" storageKey="theme">
						<FloatingTheme />
						{children}
						<Toaster />
						<MailForm show={toShow} onShowChange={handleMailFormShowChange} />
					</ThemeProvider>
				</ContentContextProvider>
				<Scripts />
			</body>
		</html>
	);
}
