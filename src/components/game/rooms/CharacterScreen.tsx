import { useState } from "react";
import { Panel, StatBar } from "../Ui";
import { player, skills } from "@/data/portfolio";
import sprite from "@/assets/rasha-sprite.png";
import { cn } from "@/lib/utils";
import { useGame } from "@/game/state";

export function CharacterScreen() {
  const [open, setOpen] = useState(skills[0]!.name);
  const { beep } = useGame();
  const active = skills.find((s) => s.name === open) ?? skills[0]!;

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Panel title="CHARACTER PROFILE">
        <div className="bevel-in flex justify-center p-3">
          <img
            src={sprite}
            alt="Pixel-art character sprite of Rasha Hasoon"
            width={736}
            height={912}
            loading="lazy"
            className="pixelated sprite-idle h-56 w-auto"
          />
        </div>
        <h3 className="mt-3 font-pixel text-[11px] text-glow">RASHA HASOON</h3>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-muted-foreground">
          <dt>CLASS</dt>
          <dd className="text-primary">{player.className}</dd>
          <dt>SUBCLASS</dt>
          <dd className="text-primary">COMMUNITY BUILDER</dd>
          <dt>LOCATION</dt>
          <dd className="text-primary">{player.location}</dd>
          <dt>PASSIVE</dt>
          <dd className="text-accent">Making people build things together</dd>
        </dl>
      </Panel>

      <div className="space-y-4">
        <Panel title="ABILITY SCORES — SELECT ONE">
          <ul className="space-y-1">
            {skills.map((s) => (
              <li key={s.name}>
                <button
                  onMouseEnter={() => setOpen(s.name)}
                  onFocus={() => setOpen(s.name)}
                  onClick={() => {
                    setOpen(s.name);
                    beep("select");
                  }}
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto] items-center gap-3 border-2 border-transparent px-2 py-1.5 text-left",
                    "hover:border-border hover:bg-secondary",
                    open === s.name && "border-primary bg-secondary",
                  )}
                >
                  <span className="font-pixel text-[8px]">{s.name.toUpperCase()}</span>
                  <StatBar level={s.level} label={s.name} />
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={`ABILITY DETAIL — ${active.name.toUpperCase()}`}>
          <p className="text-foreground/90">{active.detail}</p>
        </Panel>

        <Panel title="LORE">
          {player.bio.map((b, i) => (
            <p key={i} className="mb-2 text-foreground/90 last:mb-0">
              {b}
            </p>
          ))}
        </Panel>
      </div>
    </div>
  );
}
