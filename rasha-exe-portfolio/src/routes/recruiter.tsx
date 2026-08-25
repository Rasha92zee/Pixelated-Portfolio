import { createFileRoute, Link } from "@tanstack/react-router";
import { RecruiterMode } from "@/components/game/RecruiterMode";

const title = "Rasha Hasoon — Resume, Experience & Projects";
const description =
  "Fast professional overview of Rasha Hasoon: front-end development, project management across a 30-member global team, community leadership, achievements, education and contact links.";

export const Route = createFileRoute("/recruiter")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecruiterPage,
});

function RecruiterPage() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="font-pixel text-[10px] text-glow">RASHA HASOON — PROFESSIONAL OVERVIEW</h1>
        <Link to="/" className="text-accent underline-offset-4 hover:underline">
          ◀ enter the game
        </Link>
      </div>
      <RecruiterMode />
    </div>
  );
}
