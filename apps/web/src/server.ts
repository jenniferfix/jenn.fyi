import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";

const handler = createStartHandler({
	handler: defaultStreamHandler,
	transformAssets:
		process.env.NODE_ENV === "production" ? (process.env.CDN_ORIGIN ?? "") : "",
});

export default createServerEntry({ fetch: handler });
