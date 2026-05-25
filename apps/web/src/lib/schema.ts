import { z } from "zod";

export const socials = ["github", "bluesky", "x", "linkedin"] as const;
export const socialsEnum = z.enum(socials);

export const socialsSchema = z.object({ name: socialsEnum, url: z.string() });

export const socialsObject = z.array(socialsSchema);

export const badgeSchema = z.object({
  label: z.string(),
  url: z.string().optional(),
});

export const contentDataObject = z.object({
  socials: socialsObject,
  stackBadges: z.array(badgeSchema),
});
export type ContentDataType = z.infer<typeof contentDataObject>;
