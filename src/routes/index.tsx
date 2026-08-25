import { createFileRoute } from "@tanstack/react-router";
import { GameProvider } from "@/game/state";
import { Shell } from "@/components/game/Shell";

const title = "RASHA.EXE — Rasha Hasoon's Portfolio as a 1997 PC Game";
const description =
  "Front-end developer, project manager and community builder from Kozhikode. Explore Rasha Hasoon's career as a retro DOS-style adventure — or switch to recruiter mode.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GameProvider>
      <h1 className="sr-only">
        Rasha Hasoon — Front-End Developer, Project Manager and Community Builder
      </h1>
      <Shell />
    </GameProvider>
  );
}
