import { PostHogProvider as PostHog } from "@posthog/react";

export const PostHogProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<PostHog
			apiKey={process.env.VITE_POSTHOG_PROJECT_TOKEN!}
			options={{
				api_host: process.env.VITE_POSTHOG_API_HOST,
				ui_host: process.env.VITE_POSTHOG_UI_HOST,
			}}
			children={children}
		/>
	);
};
