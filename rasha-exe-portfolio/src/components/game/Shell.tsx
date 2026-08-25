import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGame } from "@/game/state";
import { PixelButton } from "./Ui";
import { CrtOverlay } from "./Crt";
import { Boot } from "./Boot";
import { WorldMapNav, MobileAreaBar, AREAS } from "./WorldMap";
import { RecruiterMode } from "./RecruiterMode";
import { HomeBase } from "./rooms/HomeBase";
import { CharacterScreen } from "./rooms/CharacterScreen";
import { GuildHall } from "./rooms/GuildHall";
import { QuestLog } from "./rooms/QuestLog";
import { CodeLab } from "./rooms/CodeLab";
import { CommunityHub } from "./rooms/CommunityHub";
import { Academy } from "./rooms/Academy";
import { Trophies } from "./rooms/Trophies";
import { FutureZone } from "./rooms/FutureZone";
import { Comms } from "./rooms/Comms";
import { DebugRoom } from "./rooms/DebugRoom";
import resume from "@/assets/resume.pdf.asset.json";

function Room() {
  const { area } = useGame();
  switch (area) {
    case "character":
      return <CharacterScreen />;
    case "guild":
      return <GuildHall />;
    case "quests":
      return <QuestLog />;
    case "codelab":
      return <CodeLab />;
    case "community":
      return <CommunityHub />;
    case "academy":
      return <Academy />;
    case "trophies":
      return <Trophies />;
    case "future":
      return <FutureZone />;
    case "contact":
      return <Comms />;
    case "debug":
      return <DebugRoom />;
    default:
      return <HomeBase />;
  }
}

export function Shell() {
  const [booted, setBooted] = useState(false);
  const { crt, toggleCrt, sound, toggleSound, music, toggleMusic, recruiter, setRecruiter, area, visited, toasts, beep } =
    useGame();

  if (!booted) {
    return (
      <>
        <Boot
          onStart={() => {
            setBooted(true);
            if (sound) beep("boot");
            toggleMusic();
          }}
        />
        <CrtOverlay />
      </>
    );
  }

  const current = AREAS.find((a) => a.id === area);

  return (
    <div className="min-h-screen bg-background">
      <CrtOverlay />

      <header className="sticky top-0 z-40 border-b-[3px] border-panel-light bg-panel-dark/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 py-2">
          <span className="font-pixel text-[10px] text-glow">RASHA.EXE</span>
          <span className="hidden text-muted-foreground sm:inline">
            · {current?.label ?? "HOME BASE"} · AREAS {visited.length}/10
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <PixelButton tone="ghost" onClick={toggleCrt} aria-pressed={crt}>
              CRT: {crt ? "ON" : "OFF"}
            </PixelButton>
            <PixelButton tone="ghost" onClick={toggleSound} aria-pressed={sound}>
              SOUND: {sound ? "ON" : "OFF"}
            </PixelButton>
            <PixelButton tone="ghost" onClick={toggleMusic} aria-pressed={music}>
              MUSIC: {music ? "ON" : "OFF"}
            </PixelButton>
            <a href={resume.url} download="Rasha_Hasoon_CV.pdf" className="inline-flex">
              <PixelButton tone="ghost">▣ Resume</PixelButton>
            </a>
            <PixelButton tone="amber" active={recruiter} onClick={() => setRecruiter(!recruiter)}>
              {recruiter ? "◀ Back to game" : "Recruiter mode"}
            </PixelButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 py-4">
        {recruiter ? (
          <RecruiterMode />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
            <WorldMapNav className="hidden h-fit lg:block" />
            <div key={area} className="pop-in min-w-0">
              <Room />
            </div>
          </div>
        )}
        {!recruiter ? <MobileAreaBar /> : null}
      </main>

      <footer className="border-t-[3px] border-panel-light px-3 py-4 text-center text-muted-foreground">
        <p>
          RASHA.EXE — built as a game, readable as a resume ·{" "}
          <Link to="/recruiter" className="text-accent underline-offset-4 hover:underline">
            plain overview
          </Link>
        </p>
      </footer>

      <div className="pointer-events-none fixed bottom-24 right-3 z-50 space-y-2 lg:bottom-6">
        {toasts.map((t) => (
          <div key={t.id} className="pop-in bevel max-w-72 p-3">
            <p className="font-pixel text-[8px] text-glow-amber">{t.title}</p>
            <p className="mt-1 text-foreground/90">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
