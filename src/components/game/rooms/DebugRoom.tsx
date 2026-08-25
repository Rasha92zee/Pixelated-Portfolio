import { Panel } from "../Ui";

const notes = [
  "// TODO: sleep is a solved problem, right?",
  "// The best hackathon idea always arrives at 3:41 AM.",
  "// Community building is just garbage collection for good ideas.",
  "// Shipped > perfect. Twice.",
  "// If you're reading this, you typed the secret word. Respect.",
];

export function DebugRoom() {
  return (
    <div className="space-y-4">
      <Panel title="DEBUG ROOM — CHEAT MODE ACTIVE">
        <p className="text-foreground/90">
          You found the room the level designer forgot to lock. Nothing here is on the resume.
        </p>
      </Panel>
      <Panel title="DEVELOPER NOTES.TXT">
        <ul className="space-y-1 text-muted-foreground">
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Panel>
      <Panel title="HIDDEN CHARACTER">
        <pre className="overflow-x-auto text-glow text-xs leading-tight text-primary">{`
    ▄▄▄▄▄▄
   █ ▀  ▀ █     "she's still here,
   █  ▄▄  █      three areas deeper
    ▀▄▄▄▄▀       than you expected."
     █  █
    ▄▀  ▀▄
`}</pre>
      </Panel>
    </div>
  );
}
