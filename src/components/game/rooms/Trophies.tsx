import { Panel } from "../Ui";
import { trophies } from "@/data/portfolio";
import { useGame } from "@/game/state";

export function Trophies() {
  const { beep, notify } = useGame();
  return (
    <Panel title="HALL OF TROPHIES — INVENTORY">
      <p className="text-muted-foreground">
        {trophies.length} items collected. Nothing here is decorative.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {trophies.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => {
                beep("unlock");
                notify("TROPHY INSPECTED", t.detail);
              }}
              className="h-full w-full border-[3px] border-t-panel-light border-l-panel-light border-b-panel-dark border-r-panel-dark bg-panel p-3 text-left hover:bg-secondary"
            >
              <span aria-hidden className="text-2xl">
                {t.icon}
              </span>
              <span className="mt-2 block font-pixel text-[9px] text-glow-amber">{t.title}</span>
              <span className="mt-2 block text-foreground/90">{t.detail}</span>
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
