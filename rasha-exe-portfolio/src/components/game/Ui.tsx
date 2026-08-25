import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  children,
  className,
  right,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  right?: ReactNode;
}) {
  return (
    <section className={cn("bevel", className)}>
      {title ? (
        <header className="flex items-center justify-between gap-3 border-b-[3px] border-panel-dark bg-panel-light/40 px-3 py-2">
          <h2 className="font-pixel text-[10px] text-glow-amber sm:text-xs">{title}</h2>
          {right}
        </header>
      ) : null}
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "amber" | "ghost";
  active?: boolean;
};

export function PixelButton({ tone = "default", active, className, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={cn(
        "font-pixel text-[9px] uppercase tracking-wide transition-none",
        "border-[3px] px-3 py-2 sm:text-[10px]",
        "border-t-panel-light border-l-panel-light border-b-panel-dark border-r-panel-dark",
        "active:border-t-panel-dark active:border-l-panel-dark active:border-b-panel-light active:border-r-panel-light",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        tone === "amber"
          ? "bg-accent text-accent-foreground hover:brightness-110"
          : tone === "ghost"
            ? "bg-transparent text-muted-foreground hover:text-primary"
            : "bg-panel text-primary hover:bg-secondary",
        active && "bg-primary text-primary-foreground",
        className,
      )}
    />
  );
}

export function StatBar({ level, label }: { level: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label={`${label ?? "level"} ${level} of 10`}>
      <span aria-hidden className="font-pixel text-[10px] leading-none text-primary text-glow">
        {"█".repeat(level)}
        <span className="text-muted-foreground">{"░".repeat(10 - level)}</span>
      </span>
    </span>
  );
}

export function Typewriter({
  lines,
  speed = 18,
  onDone,
  className,
  onTick,
}: {
  lines: string[];
  speed?: number;
  onDone?: () => void;
  className?: string;
  onTick?: () => void;
}) {
  const [out, setOut] = useState<string[]>([]);
  const doneRef = useRef(onDone);
  const tickRef = useRef(onTick);
  doneRef.current = onDone;
  tickRef.current = onTick;

  useEffect(() => {
    let li = 0;
    let ci = 0;
    const acc: string[] = [];
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(lines);
      doneRef.current?.();
      return;
    }
    const t = setInterval(() => {
      if (li >= lines.length) {
        clearInterval(t);
        doneRef.current?.();
        return;
      }
      ci += 1;
      acc[li] = lines[li]!.slice(0, ci);
      setOut([...acc]);
      if (ci % 3 === 0) tickRef.current?.();
      if (ci >= lines[li]!.length) {
        li += 1;
        ci = 0;
      }
    }, speed);
    return () => clearInterval(t);
  }, [lines, speed]);

  return (
    <div className={className}>
      {out.map((l, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {l}
          {i === out.length - 1 ? <span className="blink-caret">▌</span> : null}
        </p>
      ))}
    </div>
  );
}

export function Dialogue({ speaker, children }: { speaker: string; children: ReactNode }) {
  return (
    <div className="bevel-in p-3">
      <p className="font-pixel text-[9px] text-glow-amber">{speaker}</p>
      <div className="mt-2 text-foreground/90">{children}</div>
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="text-accent" aria-label={`difficulty ${n} of 5`}>
      {"★".repeat(n)}
      <span className="text-muted-foreground">{"☆".repeat(5 - n)}</span>
    </span>
  );
}
