import { useEffect, useState } from "react";
import { Typewriter, PixelButton } from "./Ui";
import { useGame } from "@/game/state";

const LINES = [
  "RASHA SYSTEM BIOS v1.0",
  "COPYRIGHT (C) 1997 KOZHIKODE MICRODEVICES",
  "",
  "INITIALIZING........... OK",
  "LOADING PERSONALITY.... OK",
  "LOADING SKILLS......... OK",
  "LOADING PROJECTS....... OK",
  "LOADING COMMUNITY...... OK",
  "LOADING AI.EXE......... OK",
  "",
  "SYSTEM READY.",
];

export function Boot({ onStart }: { onStart: () => void }) {
  const [done, setDone] = useState(false);
  const { beep } = useGame();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") onStart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStart]);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-panel-dark px-5 py-8 sm:px-10">
      <div>
        <Typewriter
          lines={LINES}
          speed={12}
          onDone={() => setDone(true)}
          onTick={() => beep("key")}
          className="text-glow text-lg leading-snug text-primary sm:text-2xl"
        />
        {done ? (
          <div className="pop-in mt-8">
            <button
              onClick={onStart}
              className="font-pixel text-[11px] text-glow-amber underline-offset-4 hover:underline sm:text-base"
            >
              [ PRESS ENTER TO START ]
            </button>
            <p className="mt-3 text-muted-foreground">
              or click above · the whole career fits in one campaign
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground">RASHA.EXE — a portfolio disguised as a 1997 PC game</p>
        <PixelButton tone="ghost" onClick={onStart}>
          Skip intro
        </PixelButton>
      </div>
    </div>
  );
}
