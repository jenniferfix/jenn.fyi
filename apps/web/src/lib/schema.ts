import { z } from "zod";

export const socials = ["github", "bluesky", "x", "linkedin"] as const;
export const socialsEnum = z.enum(socials);

export const socialsSchema = z.object({ name: socialsEnum, url: z.string() });

export const socialsObject = z.array(socialsSchema);

export const projectSchema = z.object({
	name: z.string(),
	description: z.string(),
	github: z.string().optional(),
	demo: z.string().optional(),
	screenshots: z.array(z.string()).optional(),
	screenshotDescriptions: z.array(z.string()).optional(),
});
export type ProjectType = z.infer<typeof projectSchema>;

export const badgeSchema = z.object({
	label: z.string(),
	url: z.string().optional(),
});

export const contentDataObject = z.object({
	projects: z.array(projectSchema),
	socials: socialsObject,
	stackBadges: z.array(badgeSchema),
});
export type ContentDataType = z.infer<typeof contentDataObject>;

export const formSchema = z.object({
	name: z.string().trim().min(1, {
		message: "Please let me know who you are",
	}),

	email: z.string().trim().email({
		message: "Invalid email. I want to get back to you",
	}),

	subject: z.string().trim().min(1, {
		message: "Please enter a subject",
	}),

	message: z.string().trim().min(1, {
		message: "Hi, you rang?",
	}),
	"cf-turnstile-response": z.string().trim().optional(),
});

export const homeSearchParams = z.object({
	showContactForm: z.preprocess((value) => {
		if (value === undefined) return false;
		if (value === "") return true;
		if (value === true || value === "true") return true;
		if (value === false || value === "false") return false;
		return value;
	}, z.boolean()),
});
