import { createFileRoute } from "@tanstack/react-router";
import { Socials } from "@/components/Socials";
import { TechStack } from "@/components/TechStack";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <div>Hi</div>
      <TechStack />
      <Socials />
    </div>
  );
}
