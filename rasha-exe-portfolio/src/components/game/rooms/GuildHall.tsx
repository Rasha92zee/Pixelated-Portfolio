import { useState } from "react";
import { Panel, PixelButton } from "../Ui";
import { missions } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useGame } from "@/game/state";

export function GuildHall() {
  const [sel, setSel] = useState(missions[0]!.id);
  const { beep } = useGame();
  const m = missions.find((x) => x.id === sel) ?? missions[0]!;

  return (
    <div className="space-y-4">
      <Panel title="GUILD HALL — CAREER CAMPAIGN">
        <p className="text-muted-foreground">
          Seven doors. Each one is a level she already cleared. Open a door to read the mission
          briefing.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {missions.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => {
                  setSel(x.id);
                  beep("select");
                }}
                className={cn(
                  "group w-full border-[3px] border-t-panel-light border-l-panel-light border-b-panel-dark border-r-panel-dark bg-panel p-3 text-left",
                  sel === x.id && "bg-secondary outline outline-2 outline-primary",
                )}
              >
                <span className="flex items-center justify-between font-pixel text-[8px] text-glow-amber">
                  <span>LV {String(x.level).padStart(2, "0")}</span>
                  <span aria-hidden>🚪</span>
                </span>
                <span className="mt-2 block font-pixel text-[8px] leading-relaxed">{x.code}</span>
                <span className="mt-1 block text-muted-foreground">{x.org}</span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title={`MISSION BRIEFING — ${m.code}`} right={<span className="text-accent">CLEARED</span>}>
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="font-pixel text-[11px] text-glow">{m.role}</h3>
            <p className="mt-1 text-accent">{m.org}</p>
            <p className="text-muted-foreground">{m.period}</p>
            <p className="mt-3 text-foreground/90">&ldquo;{m.blurb}&rdquo;</p>
            <h4 className="mt-4 font-pixel text-[9px] text-glow-amber">OBJECTIVES</h4>
            <ul className="mt-2 space-y-1">
              {m.objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <span aria-hidden className="text-primary">
                    ▣
                  </span>
                  <span className="text-foreground/90">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bevel-in h-fit p-3">
            <p className="font-pixel text-[8px] text-glow-amber">LOADOUT</p>
            <ul className="mt-2 space-y-1">
              {m.tags.map((t) => (
                <li key={t} className="border-2 border-border px-2 py-0.5 text-center text-primary">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <PixelButton
            onClick={() => {
              const i = missions.findIndex((x) => x.id === m.id);
              setSel(missions[(i + 1) % missions.length]!.id);
              beep("move");
            }}
          >
            Next level ▶
          </PixelButton>
        </div>
      </Panel>
    </div>
  );
}
