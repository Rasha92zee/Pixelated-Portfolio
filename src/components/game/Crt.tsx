import { useGame } from "@/game/state";

/** Non-interactive CRT overlay: scanlines, vignette, phosphor flicker. */
export function CrtOverlay() {
  const { crt } = useGame();
  if (!crt) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <div className="crt-scanlines absolute inset-0 opacity-60" />
      <div className="crt-vignette absolute inset-0" />
      <div className="flicker absolute inset-0 bg-primary/10 mix-blend-overlay" />
    </div>
  );
}
