import { processor } from "@jenn.fyi/ui/lib/markdown";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/Hero";
import { MarkdownPage } from "@/components/MarkdownPage";
import { More } from "@/components/More";
import { Socials } from "@/components/Socials";
import bio from "../../data/bio.md?raw";
import markdowntests from "../../data/markdowntests.md?raw";
import resume from "../../data/resume.md?raw";

const Portfolio = lazy(() =>
	import("@/components/Portfolio").then((module) => ({
		default: module.Portfolio,
	})),
);

const TechStack = lazy(() =>
	import("@/components/TechStack").then((module) => ({
		default: module.TechStack,
	})),
);

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

const FallbackSection = ({ section }: { section?: string }) => {
	return <section id={section} className="herosection"></section>;
};

function RouteComponent() {
	const { biohtml, resumehtml } = Route.useLoaderData();
	return (
		<main id="main">
			<Hero />
			<MarkdownPage content={biohtml} />
			<Suspense fallback={<FallbackSection section="portfolio" />}>
				<Portfolio />
			</Suspense>
			<MarkdownPage title="Resume" content={resumehtml} />
			<TechStack />
			<Socials />
			<More />
		</main>
	);
}
