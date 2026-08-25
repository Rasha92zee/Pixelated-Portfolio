import { Panel, StatBar, Stars } from "./Ui";
import {
  education,
  missions,
  player,
  quests,
  skills,
  trophies,
} from "@/data/portfolio";
import resume from "@/assets/resume.pdf.asset.json";
import sprite from "@/assets/rasha-sprite.png";

/** Fast professional overview — same visual language, zero gameplay friction. */
export function RecruiterMode() {
  return (
    <div className="space-y-4">
      <Panel title="RECRUITER MODE — 60 SECOND BRIEF">
        <div className="flex flex-wrap items-start gap-4">
          <img
            src={sprite}
            alt="Pixel-art portrait of Rasha Hasoon"
            width={736}
            height={912}
            loading="lazy"
            className="pixelated h-32 w-auto"
          />
          <div className="min-w-56 flex-1">
            <h1 className="font-pixel text-xs text-glow sm:text-sm">RASHA HASOON</h1>
            <p className="mt-2 text-accent">{player.title}</p>
            <p className="text-muted-foreground">{player.location}</p>
            <p className="mt-2 text-foreground/90">{player.bio[1]}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="text-accent underline-offset-4 hover:underline" href={player.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="text-accent underline-offset-4 hover:underline" href={player.links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="text-accent underline-offset-4 hover:underline" href={resume.url} download="Rasha_Hasoon_CV.pdf">
                Download resume ↓
              </a>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="SKILLS">
          <ul className="space-y-2">
            {skills.map((s) => (
              <li key={s.name}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-pixel text-[8px]">{s.name.toUpperCase()}</span>
                  <StatBar level={s.level} label={s.name} />
                </div>
                <p className="text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="EXPERIENCE">
          <ul className="space-y-3">
            {missions.map((m) => (
              <li key={m.id}>
                <p className="font-pixel text-[8px] text-glow-amber">{m.role}</p>
                <p className="text-primary">{m.org}</p>
                <p className="text-muted-foreground">{m.period}</p>
                <ul className="mt-1 list-disc pl-5 text-foreground/90">
                  {m.objectives.slice(0, 3).map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="PROJECTS">
          <ul className="space-y-3">
            {quests.map((q) => (
              <li key={q.id}>
                <p className="flex items-center justify-between gap-2">
                  <span className="font-pixel text-[8px] text-glow-amber">{q.name}</span>
                  <Stars n={q.difficulty} />
                </p>
                <p className="text-foreground/90">{q.objective}</p>
                <p className="text-muted-foreground">{q.tech.join(" · ")}</p>
                {q.repo ? (
                  <a className="text-accent underline-offset-4 hover:underline" href={q.repo} target="_blank" rel="noreferrer">
                    Repository ↗
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel title="ACHIEVEMENTS">
            <ul className="space-y-1 text-foreground/90">
              {trophies.map((t) => (
                <li key={t.id}>
                  <span aria-hidden>{t.icon}</span> {t.detail}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="EDUCATION">
            <p className="text-foreground/90">{education.degree}</p>
            <p className="text-primary">{education.school}</p>
            <p className="text-muted-foreground">
              {education.place} · {education.period}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
