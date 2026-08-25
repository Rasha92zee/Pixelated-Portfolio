import { Panel } from "../Ui";
import { futureZone } from "@/data/portfolio";

export function FutureZone() {
  return (
    <div className="space-y-4">
      <Panel title="FUTURE ZONE — AREA NOT YET CLEARED">
        <p className="text-foreground/90">
          Current class: Developer. Secondary class: Community Builder. Passive ability: making
          people build things together.
        </p>
      </Panel>
      <div className="grid gap-3 md:grid-cols-2">
        {futureZone.map((f) => (
          <Panel key={f.title} title={f.title}>
            <p className="text-foreground/90">{f.note}</p>
          </Panel>
        ))}
      </div>
      <Panel title="NEXT LEVEL LOADING">
        <p className="font-pixel text-[9px] leading-relaxed text-glow-amber">
          &gt; every failure is a respawn_<span className="blink-caret">▌</span>
        </p>
      </Panel>
    </div>
  );
}
