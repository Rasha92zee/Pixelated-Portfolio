import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sfx, startMusic, stopMusic, type SfxName } from "@/lib/sfx";

export type AreaId =
  | "home"
  | "character"
  | "codelab"
  | "quests"
  | "guild"
  | "community"
  | "academy"
  | "trophies"
  | "future"
  | "contact"
  | "debug";

type Toast = { id: number; title: string; body: string };

type GameState = {
  crt: boolean;
  toggleCrt: () => void;
  sound: boolean;
  toggleSound: () => void;
  music: boolean;
  toggleMusic: () => void;
  recruiter: boolean;
  setRecruiter: (v: boolean) => void;
  area: AreaId;
  go: (a: AreaId) => void;
  visited: AreaId[];
  cheat: boolean;
  setCheat: (v: boolean) => void;
  toasts: Toast[];
  notify: (title: string, body: string) => void;
  beep: (n: SfxName) => void;
};

const Ctx = createContext<GameState | null>(null);

const SECRET = "builder";

export function GameProvider({ children }: { children: ReactNode }) {
  const [crt, setCrt] = useState(true);
  const [sound, setSound] = useState(false);
  const [music, setMusic] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const [area, setArea] = useState<AreaId>("home");
  const [visited, setVisited] = useState<AreaId[]>(["home"]);
  const [cheat, setCheat] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const beep = useCallback(
    (n: SfxName) => {
      if (sound) sfx[n]();
    },
    [sound],
  );

  useEffect(() => {
    if (music) startMusic();
    else stopMusic();
    return () => stopMusic();
  }, [music]);

  const notify = useCallback((title: string, body: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, body }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const go = useCallback(
    (a: AreaId) => {
      setArea(a);
      beep("move");
      setVisited((v) => (v.includes(a) ? v : [...v, a]));
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    },
    [beep],
  );

  // Original secret code: type B-U-I-L-D-E-R anywhere.
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-SECRET.length);
      if (buf === SECRET) {
        setCheat(true);
        setVisited((v) => (v.includes("debug") ? v : [...v, "debug"]));
        notify("CHEAT MODE ENABLED", "DEBUG ROOM unlocked on the world map.");
        if (sound) sfx.unlock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [notify, sound]);

  useEffect(() => {
    if (visited.length === 9) notify("ACHIEVEMENT UNLOCKED", "EXPLORER — you walked the whole map.");
  }, [visited.length, notify]);

  const value = useMemo<GameState>(
    () => ({
      crt,
      toggleCrt: () => setCrt((c) => !c),
      sound,
      toggleSound: () => setSound((s) => !s),
      music,
      toggleMusic: () => setMusic((m) => !m),
      recruiter,
      setRecruiter,
      area,
      go,
      visited,
      cheat,
      setCheat,
      toasts,
      notify,
      beep,
    }),
    [crt, sound, music, recruiter, area, go, visited, cheat, toasts, notify, beep],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useGame() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useGame must be used inside GameProvider");
  return v;
}
