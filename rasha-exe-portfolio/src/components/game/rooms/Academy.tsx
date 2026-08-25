import { Panel } from "../Ui";
import { education } from "@/data/portfolio";

export function Academy() {
  return (
    <div className="space-y-4">
      <Panel title="ACADEMY — TRAINING ARC">
        <h3 className="font-pixel text-[11px] text-glow">{education.degree}</h3>
        <p className="mt-1 text-accent">{education.school}</p>
        <p className="text-muted-foreground">
          {education.place} · {education.period}
        </p>
      </Panel>

      <Panel title="XP TIMELINE">
        <ol className="space-y-3">
          {education.arc.map((a) => (
            <li key={a.year} className="grid grid-cols-[64px_1fr] gap-3">
              <span className="font-pixel text-[10px] text-glow-amber">{a.year}</span>
              <div className="bevel-in p-2">
                <p className="font-pixel text-[8px] text-primary">{a.label}</p>
                <p className="mt-1 text-foreground/90">{a.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
