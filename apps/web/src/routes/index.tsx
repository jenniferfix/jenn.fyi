import { processor } from "@jenn.fyi/ui/lib/markdown";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { MarkdownPage } from "@/components/MarkdownPage";
import { More } from "@/components/More";
import { Portfolio } from "@/components/Portfolio";
import { Socials } from "@/components/Socials";
import { TechStack } from "@/components/TechStack";
import bio from "../../data/bio.md?raw";
import markdowntests from "../../data/markdowntests.md?raw";
import resume from "../../data/resume.md?raw";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async () => {
		const biohtml = String(processor.processSync(bio).value);
		const resumehtml = String(processor.processSync(resume).value);
		const markdowntestshtml = String(
			processor.processSync(markdowntests).value,
		);
		return { biohtml, resumehtml, markdowntestshtml };
	},
});

function RouteComponent() {
	const { biohtml, resumehtml } = Route.useLoaderData();
	return (
		<main id="main">
			<Hero />
			<MarkdownPage title="Bio" content={biohtml} />
			<Portfolio />
			<MarkdownPage title="Resume" content={resumehtml} />
			<TechStack />
			<Socials />
			<More />
		</main>
	);
}
