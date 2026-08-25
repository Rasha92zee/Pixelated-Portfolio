import { useState } from "react";
import { Panel, PixelButton, Stars } from "../Ui";
import { quests } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useGame } from "@/game/state";

export function QuestLog() {
  const [sel, setSel] = useState<string | null>(quests[0]!.id);
  const { beep } = useGame();
  const q = quests.find((x) => x.id === sel);

  return (
    <div className="space-y-4">
      <Panel title="QUEST LOG">
        <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {quests.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => {
                  setSel(x.id);
                  beep("select");
                }}
                className={cn(
                  "h-full w-full border-[3px] border-t-panel-light border-l-panel-light border-b-panel-dark border-r-panel-dark bg-panel p-3 text-left",
                  sel === x.id && "bg-secondary outline outline-2 outline-primary",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="font-pixel text-[8px] text-glow-amber">{x.no}</span>
                  <Stars n={x.difficulty} />
                </span>
                <span className="mt-2 block font-pixel text-[9px] leading-relaxed">{x.name}</span>
                <span className="mt-1 block text-muted-foreground">{x.questClass}</span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      {q ? (
        <Panel title={`MISSION FILE — ${q.name}`} right={<Stars n={q.difficulty} />}>
          <dl className="grid gap-3 md:grid-cols-2">
            <div>
              <dt className="font-pixel text-[9px] text-glow-amber">OBJECTIVE</dt>
              <dd className="mt-1 text-foreground/90">{q.objective}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[9px] text-glow-amber">CHALLENGE</dt>
              <dd className="mt-1 text-foreground/90">{q.challenge}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[9px] text-glow-amber">SOLUTION</dt>
              <dd className="mt-1 text-foreground/90">{q.solution}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[9px] text-glow-amber">OUTCOME</dt>
              <dd className="mt-1 text-foreground/90">{q.outcome}</dd>
            </div>
          </dl>
          <ul className="mt-4 flex flex-wrap gap-2">
            {q.tech.map((t) => (
              <li key={t} className="border-2 border-border px-2 py-0.5 text-primary">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {q.repo ? (
              <a href={q.repo} target="_blank" rel="noreferrer">
                <PixelButton tone="amber">Open repository ↗</PixelButton>
              </a>
            ) : (
              <span className="text-muted-foreground">REPO: private / not listed</span>
            )}
            {q.demo ? (
              <a href={q.demo} target="_blank" rel="noreferrer">
                <PixelButton>Live demo ↗</PixelButton>
              </a>
            ) : null}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
