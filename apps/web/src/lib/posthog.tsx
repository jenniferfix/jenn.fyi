import { PostHogProvider as PostHog } from "@posthog/react";

export const PostHogProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<PostHog
			apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN!}
			options={{
				api_host: import.meta.env.VITE_POSTHOG_HOST,
			}}
			children={children}
		/>
	);
};
