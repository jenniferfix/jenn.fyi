import { z } from "zod";

export const imageSizeSchema = z.object({
	url: z.string(),
	width: z.int(),
	height: z.int(),
	default: z.boolean().default(false),
});

const imgArray = z.array(imageSizeSchema);

export const screenshotSchema = z.object({
	alt: z.string({ error: "Alt text is required!" }),
	description: z.string(),
	images: imgArray,
});
export type ScreenshotType = z.infer<typeof screenshotSchema>;

const variantArray = ["dark", "light"] as const;
const variantEnum = z.enum(variantArray);

const variantSchema = z.object({
	name: z.string({ error: "Must provide a pretty variant name" }),
	...screenshotSchema.shape,
});

const variantRecord = z.record(variantEnum, variantSchema);
export type VariantRecord = z.infer<typeof variantRecord>;

const slideTypes = ["basic", "variants"] as const;

const slideTypeEnum = z.enum(slideTypes);

const basicSlideSchema = z.object({
	type: z.literal("basic"),
	image: screenshotSchema,
});
const variantSlideSchema = z.object({
	type: z.literal("variants"),
	variants: variantRecord,
});

const slideUnion = z.discriminatedUnion("type", [
	basicSlideSchema,
	variantSlideSchema,
]);

export const projectSlides = z.array(slideUnion);

export type ProjectSlide = z.infer<typeof slideUnion>;

export const socials = ["github", "bluesky", "x", "linkedin"] as const;
export const socialsEnum = z.enum(socials);

export const socialsSchema = z.object({ name: socialsEnum, url: z.string() });

export const socialsObject = z.array(socialsSchema);

export const projectSchema = z.object({
	name: z.string(),
	description: z.string(),
	github: z.string().optional(),
	demo: z.string().optional(),
	slides: projectSlides.optional(),
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
	"cf-turnstile-response": z
		.string()
		.trim()
		.min(1, { error: "Please complete verification" }),
});

export const homeSearchParams = z.object({
	showContactForm: z.preprocess((value) => {
		if (value === "") return true;
		if (value === true || value === "true") return true;
		if (value === false || value === "false") return false;
		return value;
	}, z.boolean().optional()),
});
