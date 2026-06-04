import {
	createRootRoute,
	ErrorComponent,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useCallback } from "react";
import { ContentContextProvider } from "@/components/ContentContext";
import { FloatingTheme } from "@/components/FloatingTheme";
import { ThemeProvider } from "@/components/theme-provider";
import { appStrings } from "@/lib/constants";
import { homeSearchParams } from "@/lib/schema";
import "../globals.css";

const MailForm = lazy(() =>
	import("@/components/MailForm").then((module) => ({
		default: module.MailForm,
	})),
);

const Toaster = lazy(() =>
	import("@jenn.fyi/ui/components/sonner").then((module) => ({
		default: module.Toaster,
	})),
);

const socialImg = "/images/social_img_1200x630.webp";
const twitterImg = "/images/social_img_1200x675.webp";

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
				title: appStrings.APP_TITLE,
			},
			{
				name: "description",
				content: appStrings.APP_DESCRIPTION,
			},
			// Social media opengraph https://ogp.me/
			// https://css-tricks.com/essential-meta-tags-social-media/
			{
				property: "og:title",
				content: appStrings.APP_TITLE,
			},
			{
				property: "og:description",
				content: appStrings.APP_DESCRIPTION,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:url",
				content: `https://${appStrings.APP_DOMAIN}/`,
			},
			{
				property: "og:image",
				content: socialImg,
			},
			{
				name: "twitter:title",
				content: appStrings.APP_TITLE,
			},
			{
				name: "twitter:image",
				content: twitterImg,
			},
			{
				name: "twitter:description",
				content: appStrings.APP_DESCRIPTION,
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
		],
		links: [
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
					search: {},
					params,
				});
		},
		[navigate, params],
	);

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
						<Suspense fallback={null}>
							<Toaster />
							<MailForm
								show={!!showContactForm}
								onShowChange={handleMailFormShowChange}
							/>
						</Suspense>
					</ThemeProvider>
				</ContentContextProvider>
				<Scripts />
			</body>
		</html>
	);
}
