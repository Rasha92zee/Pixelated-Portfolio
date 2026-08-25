import { useEffect, useRef, useState } from "react";
import { Panel, PixelButton } from "../Ui";
import { player, quests } from "@/data/portfolio";
import { useGame } from "@/game/state";

const repoList = quests.filter((q) => q.repo);

const HELP = [
  "AVAILABLE COMMANDS:",
  "  dir            list repositories",
  "  open <n>       open repository n",
  "  whoami         player identity",
  "  github         open github profile",
  "  linkedin       open linkedin profile",
  "  cls            clear screen",
  "  help           this list",
];

const banner = [
  "MS-DOS-ish SHELL [Version 5.0]  (C) RASHA MICRODEVICES",
  "",
  "C:\\RASHA\\PROJECTS> dir /projects",
  ...repoList.map((q, i) => `  ${String(i + 1).padStart(2, "0")}  ${q.name}`),
  "",
  "TYPE 'help' FOR COMMANDS.",
];

export function CodeLab() {
  const [log, setLog] = useState<string[]>(banner);
  const [cmd, setCmd] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { beep, notify } = useGame();

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [log]);

  function push(...lines: string[]) {
    setLog((l) => [...l, ...lines]);
  }

  function run(raw: string) {
    const input = raw.trim();
    push(`C:\\RASHA\\PROJECTS> ${input}`);
    const [c, arg] = input.toLowerCase().split(/\s+/);
    switch (c) {
      case "":
        break;
      case "help":
        push(...HELP);
        beep("select");
        break;
      case "dir":
        push(...repoList.map((q, i) => `  ${String(i + 1).padStart(2, "0")}  ${q.name}`));
        beep("select");
        break;
      case "whoami":
        push(
          "RASHA HASOON — Front-End Developer / Project Manager / Community Builder",
          "Currently into AI and Data Science. Passionate about communities.",
          "Talk to me about innovative tech.",
        );
        beep("select");
        break;
      case "open": {
        const idx = Number(arg) - 1;
        const q = repoList[idx];
        if (!q?.repo) {
          push("ERROR: no such project. try 'dir'.");
          beep("error");
        } else {
          push(`OPENING ${q.name} ...`);
          window.open(q.repo, "_blank", "noreferrer");
          beep("pickup");
        }
        break;
      }
      case "github":
        window.open(player.links.github, "_blank", "noreferrer");
        push("LAUNCHING github.com/Rasha92zee ...");
        beep("pickup");
        break;
      case "linkedin":
        window.open(player.links.linkedin, "_blank", "noreferrer");
        push("LAUNCHING linkedin.com/in/rasha-hasoon ...");
        beep("pickup");
        break;
      case "cls":
        setLog([]);
        return;
      case "xyzzy":
        push("Nothing happens. (But you found the oldest joke in adventure gaming.)");
        notify("SECRET FOUND", "XYZZY — an ancient incantation, still useless.");
        beep("unlock");
        break;
      default:
        push(`Bad command or file name: ${c}`);
        beep("error");
    }
  }

  return (
    <div className="space-y-4">
      <Panel title="CODE LAB — DEV TERMINAL">
        <div className="bevel-in h-80 overflow-y-auto p-3 text-glow">
          {log.map((l, i) => (
            <p key={i} className="whitespace-pre-wrap leading-snug">
              {l}
            </p>
          ))}
          <div ref={endRef} />
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(cmd);
            setCmd("");
          }}
        >
          <label htmlFor="dos" className="font-pixel text-[9px] text-glow-amber">
            C:\&gt;
          </label>
          <input
            id="dos"
            value={cmd}
            onChange={(e) => {
              setCmd(e.target.value);
              beep("key");
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command…"
            className="min-w-0 flex-1 bg-input px-2 py-1.5 text-primary outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
          />
          <PixelButton type="submit" tone="amber">
            Run
          </PixelButton>
        </form>
      </Panel>

      <Panel title="REPOSITORY INDEX">
        <ul className="grid gap-2 sm:grid-cols-2">
          {repoList.map((q, i) => (
            <li key={q.id} className="bevel-in flex items-center justify-between gap-3 p-2">
              <span>
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {q.name}
              </span>
              <a
                href={q.repo}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                open ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={player.links.github} target="_blank" rel="noreferrer">
            <PixelButton tone="amber">GitHub profile ↗</PixelButton>
          </a>
          <a href={player.links.linkedin} target="_blank" rel="noreferrer">
            <PixelButton>LinkedIn ↗</PixelButton>
          </a>
        </div>
      </Panel>
    </div>
  );
}
