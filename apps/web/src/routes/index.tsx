import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { Bio } from "@/components/Bio";
import { Hero } from "@/components/Hero";
import { MailForm } from "@/components/MailForm";
import { More } from "@/components/More";
import { Portfolio } from "@/components/Portfolio";
import { Resume } from "@/components/Resume";
import { Socials } from "@/components/Socials";
import { TechStack } from "@/components/TechStack";
import { CodeSample } from "../components/CodeSample";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main id="main">
			<Hero />
			<Resume />
			<Portfolio />
			<Bio />
			<TechStack />
			<Socials />
			<More />
		</main>
	);
}
