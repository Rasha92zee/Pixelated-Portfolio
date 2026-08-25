import { useState } from "react";
import { Panel } from "../Ui";
import { communityLinks, communityNodes } from "@/data/portfolio";
import { useGame } from "@/game/state";

export function CommunityHub() {
  const [sel, setSel] = useState("hub");
  const { beep } = useGame();
  const node = communityNodes.find((n) => n.id === sel) ?? communityNodes[0]!;
  const pos = (id: string) => communityNodes.find((n) => n.id === id)!;

  return (
    <div className="space-y-4">
      <Panel title="COMMUNITY HUB — THE GUILD MAP">
        <p className="text-muted-foreground">
          She doesn&apos;t just build software. She builds the ecosystems around it. Select a node.
        </p>
        <div className="mt-3 bevel-in p-2">
          <svg
            viewBox="0 0 100 80"
            className="h-72 w-full sm:h-96"
            role="img"
            aria-label="Map of communities Rasha has built and led"
          >
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M5 0H0V5" fill="none" stroke="var(--panel-light)" strokeWidth="0.2" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#grid)" />
            {communityLinks.map(([a, b]) => {
              const A = pos(a);
              const B = pos(b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="var(--primary)"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                  opacity={sel === a || sel === b ? 1 : 0.4}
                  className="dash-flow"
                />
              );
            })}
            {communityNodes.map((n) => (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={n.label}
                onClick={() => {
                  setSel(n.id);
                  beep("select");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSel(n.id);
                  }
                }}
                onMouseEnter={() => setSel(n.id)}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={n.x - 2}
                  y={n.y - 2}
                  width="4"
                  height="4"
                  fill={n.id === "hub" ? "var(--amber)" : sel === n.id ? "var(--primary)" : "var(--panel-light)"}
                  stroke="var(--primary)"
                  strokeWidth="0.3"
                  className={n.id === "hub" ? "node-pulse" : undefined}
                />
                <text
                  x={n.x}
                  y={n.y + 7}
                  textAnchor="middle"
                  fontSize="2.6"
                  fill={sel === n.id ? "var(--amber)" : "var(--muted-foreground)"}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        <Panel title={`NODE — ${node.label.toUpperCase()}`}>
          <p className="text-foreground/90">{node.note}</p>
        </Panel>
        <Panel title="GUILD MOTTO">
          <p className="font-pixel text-[10px] leading-relaxed text-glow-amber">
            &ldquo;Technology becomes more powerful when people build together.&rdquo;
          </p>
        </Panel>
      </div>
    </div>
  );
}
