import { Panel, PixelButton, Dialogue } from "../Ui";
import { useGame } from "@/game/state";
import { player } from "@/data/portfolio";
import room from "@/assets/home-base.jpg";
import sprite from "@/assets/rasha-sprite.png";
import resume from "@/assets/resume.pdf.asset.json";

export function HomeBase() {
  const { go, notify, beep } = useGame();

  return (
    <div className="space-y-4">
      <Panel title="LEVEL 01 — HOME BASE">
        <div className="relative overflow-hidden border-[3px] border-panel-dark">
          <img
            src={room}
            alt="Pixel-art bedroom coding den with a glowing CRT monitor, desk, books and floppy disks"
            width={1280}
            height={720}
            className="pixelated w-full"
          />
          <img
            src={sprite}
            alt="Pixel-art character of Rasha Hasoon holding a laptop"
            width={736}
            height={912}
            className="pixelated sprite-idle absolute bottom-[4%] left-[6%] h-[52%] w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]"
          />
          <div className="absolute right-[4%] top-[6%] w-[46%] max-w-72 bevel-in p-2 text-[0.85rem] leading-tight sm:p-3 sm:text-base">
            <p className="font-pixel text-[8px] text-glow-amber">PLAYER 01</p>
            <p className="mt-1 font-pixel text-[10px] text-glow sm:text-xs">RASHA HASOON</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 text-muted-foreground">
              <dt>CLASS</dt>
              <dd className="text-primary">{player.className}</dd>
              <dt>SPEC</dt>
              <dd className="text-primary">TECH + COMMUNITY</dd>
              <dt>BASE</dt>
              <dd className="text-primary">KOZHIKODE, IN</dd>
              <dt>STATUS</dt>
              <dd className="text-accent">● {player.status}</dd>
            </dl>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <PixelButton tone="amber" onClick={() => go("guild")}>
            ▶ Start adventure
          </PixelButton>
          <PixelButton onClick={() => go("quests")}>View quests</PixelButton>
          <PixelButton onClick={() => go("contact")}>Contact player</PixelButton>
          <a
            href={resume.url}
            download="Rasha_Hasoon_CV.pdf"
            onClick={() => {
              beep("pickup");
              notify("ITEM ACQUIRED", "[FLOPPY DISK] RASHA_RESUME.pdf");
            }}
          >
            <span className="inline-block border-[3px] border-t-panel-light border-l-panel-light border-b-panel-dark border-r-panel-dark bg-panel px-3 py-2 font-pixel text-[9px] uppercase text-primary hover:bg-secondary sm:text-[10px]">
              ▣ Take resume
            </span>
          </a>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="NPC: THE PLAYER HERSELF">
          <Dialogue speaker="RASHA">
            <p>{player.tagline}</p>
            <p className="mt-2 text-muted-foreground">
              {player.bio[1]}
            </p>
          </Dialogue>
          <p className="mt-3 text-muted-foreground">
            Every skill is an ability. Every project is a mission. Every role is a level. Every
            community is a party.
          </p>
        </Panel>

        <Panel title="QUICK TRAVEL">
          <ul className="space-y-2">
            {[
              ["character", "☺", "Character sheet — skills as stats"],
              ["guild", "▤", "Guild Hall — 7 career levels cleared"],
              ["community", "◍", "Community Hub — the map of guilds"],
              ["codelab", "▮", "Code Lab — the DOS project terminal"],
            ].map(([id, icon, label]) => (
              <li key={id}>
                <button
                  onClick={() => go(id as never)}
                  className="flex w-full items-center gap-2 border-2 border-transparent px-2 py-1.5 text-left hover:border-border hover:bg-secondary"
                >
                  <span aria-hidden>{icon}</span>
                  <span>{label}</span>
                  <span aria-hidden className="ml-auto text-accent">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            HINT: something happens if you type a seven-letter word describing this player&apos;s
            class.
          </p>
        </Panel>
      </div>
    </div>
  );
}
