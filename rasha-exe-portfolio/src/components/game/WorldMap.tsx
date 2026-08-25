import { useGame, type AreaId } from "@/game/state";
import { cn } from "@/lib/utils";

export const AREAS: { id: AreaId; icon: string; label: string; short: string }[] = [
  { id: "home", icon: "⌂", label: "HOME BASE", short: "HOME" },
  { id: "character", icon: "☺", label: "CHARACTER", short: "STATS" },
  { id: "guild", icon: "▤", label: "GUILD HALL", short: "WORK" },
  { id: "quests", icon: "†", label: "QUEST LOG", short: "QUESTS" },
  { id: "codelab", icon: "▮", label: "CODE LAB", short: "CODE" },
  { id: "community", icon: "◍", label: "COMMUNITY HUB", short: "GUILDS" },
  { id: "academy", icon: "✎", label: "ACADEMY", short: "STUDY" },
  { id: "trophies", icon: "★", label: "HALL OF TROPHIES", short: "LOOT" },
  { id: "future", icon: "▲", label: "FUTURE ZONE", short: "NEXT" },
  { id: "contact", icon: "☎", label: "COMMS TERMINAL", short: "TALK" },
];

export function WorldMapNav({ className }: { className?: string }) {
  const { area, go, visited, cheat } = useGame();
  const list = cheat
    ? [...AREAS, { id: "debug" as AreaId, icon: "⚙", label: "DEBUG ROOM", short: "DEBUG" }]
    : AREAS;

  return (
    <nav className={cn("bevel p-2", className)} aria-label="World map">
      <p className="px-1 pb-2 font-pixel text-[9px] text-glow-amber">WORLD MAP</p>
      <ul className="space-y-1">
        {list.map((a) => {
          const isActive = area === a.id;
          return (
            <li key={a.id}>
              <button
                onClick={() => go(a.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-2 border-2 border-transparent px-2 py-1.5 text-left",
                  "hover:border-border hover:bg-secondary",
                  isActive && "border-primary bg-secondary text-glow",
                )}
              >
                <span aria-hidden className="text-base leading-none">
                  {a.icon}
                </span>
                <span className="font-pixel text-[8px] leading-tight">{a.label}</span>
                {visited.includes(a.id) && !isActive ? (
                  <span aria-hidden className="ml-auto text-xs text-muted-foreground">
                    ✓
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileAreaBar() {
  const { area, go, cheat } = useGame();
  const list = cheat
    ? [...AREAS, { id: "debug" as AreaId, icon: "⚙", label: "DEBUG ROOM", short: "DEBUG" }]
    : AREAS;
  return (
    <nav
      aria-label="World map"
      className="sticky bottom-0 z-40 -mx-3 border-t-[3px] border-panel-light bg-panel-dark/95 backdrop-blur lg:hidden"
    >
      <ul className="flex snap-x gap-1 overflow-x-auto px-2 py-2">
        {list.map((a) => (
          <li key={a.id} className="snap-start">
            <button
              onClick={() => go(a.id)}
              aria-current={area === a.id ? "page" : undefined}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 border-2 px-2 py-1.5",
                area === a.id
                  ? "border-primary bg-secondary text-glow"
                  : "border-transparent text-muted-foreground",
              )}
            >
              <span aria-hidden className="text-base leading-none">
                {a.icon}
              </span>
              <span className="font-pixel text-[7px]">{a.short}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
