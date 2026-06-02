import { Toaster } from "@jenn.fyi/ui/components/sonner";
import {
	createRootRoute,
	ErrorComponent,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { useCallback } from "react";
import { ContentContextProvider } from "@/components/ContentContext";
import { FloatingTheme } from "@/components/FloatingTheme";
import { MailForm } from "@/components/MailForm";
import { ThemeProvider } from "@/components/theme-provider";
import { homeSearchParams } from "@/lib/schema";
import appCss from "../globals.css?url";

export const Route = createRootRoute({
	validateSearch: homeSearchParams,
	head: () => ({
		styles: [
			{
				children: `.herosection {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	scroll-snap-align: start;
}
.herosection figure {
	display: flex;
	justify-content: center;
	margin-bottom: calc(var(--spacing) * 8);
	/* flex justify-center mb-8 md:mb-0 md:my-auto md:mr-8 */
}

.herosection > div:first-child {
	display: flex;
	flex-direction: column;
	/* flex flex-col md:flex-row */
}

@media (width >= 48rem) {
	.herosection > div:first-of-type {
		flex-direction: row;
	}
	.herosection figure {
		margin-bottom: 0;
		margin-block: auto;
		margin-right: calc(var(--spacing) * 8);
	}
}`,
			},
		],
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
			{
				rel: "preload",
				href: appCss,
				as: "style",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{ rel: "icon", href: "/favicon.ico", sizes: "any" },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
		],
	}),
	errorComponent: ErrorComponent,
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
