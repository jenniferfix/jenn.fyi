import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient() {
	if (!posthogClient) {
		posthogClient = new PostHog(process.env.VITE_POSTHOG_PROJECT_TOKEN!, {
			host: process.env.VITE_POSTHOG_API_HOST,
			flushAt: 1,
			flushInterval: 10000,
		});
	}
	return posthogClient;
}
