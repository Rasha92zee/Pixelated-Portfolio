import { useState } from "react";
import { Panel, PixelButton } from "../Ui";
import { player } from "@/data/portfolio";
import { useGame } from "@/game/state";
import resume from "@/assets/resume.pdf.asset.json";

export function Comms() {
  const [sent, setSent] = useState(false);
  const { beep, notify } = useGame();

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Panel title="COMMUNICATION TERMINAL">
        <p className="text-muted-foreground">SEND MESSAGE TO PLAYER RASHA</p>
        <form
          className="mt-3 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(`RASHA.EXE message from ${data.get("name")}`);
            const body = encodeURIComponent(
              `${data.get("message")}\n\nReply to: ${data.get("email")}`,
            );
            window.open(
              `${player.links.linkedin}`,
              "_blank",
              "noreferrer",
            );
            void subject;
            void body;
            setSent(true);
            beep("unlock");
            notify("TRANSMISSION SENT", "LinkedIn opened — the fastest route to her inbox.");
          }}
        >
          {[
            { id: "name", label: "NAME", type: "text" },
            { id: "email", label: "EMAIL", type: "email" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="font-pixel text-[8px] text-glow-amber">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required
                className="mt-1 w-full bg-input px-2 py-2 text-primary outline-none ring-primary focus:ring-2"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="font-pixel text-[8px] text-glow-amber">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full bg-input px-2 py-2 text-primary outline-none ring-primary focus:ring-2"
            />
          </div>
          <PixelButton tone="amber" type="submit">
            ▶ Transmit
          </PixelButton>
          {sent ? (
            <p className="text-accent">
              TRANSMISSION ROUTED. This terminal has no mail server yet — LinkedIn opened instead.
            </p>
          ) : null}
        </form>
      </Panel>

      <div className="space-y-4">
        <Panel title="DIRECT CHANNELS">
          <ul className="space-y-2">
            <li>
              <a
                className="text-accent underline-offset-4 hover:underline"
                href={player.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                className="text-accent underline-offset-4 hover:underline"
                href={player.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </li>
            <li className="text-muted-foreground">EMAIL: [not listed — ask via LinkedIn]</li>
            <li className="text-muted-foreground">BASE: {player.location}</li>
          </ul>
        </Panel>
        <Panel title="INVENTORY ITEM">
          <a href={resume.url} download="Rasha_Hasoon_CV.pdf" onClick={() => beep("pickup")}>
            <span className="bevel-in flex items-center gap-3 p-3 hover:bg-secondary">
              <span aria-hidden className="text-2xl">
                ▣
              </span>
              <span>
                <span className="block font-pixel text-[8px] text-glow-amber">RASHA_RESUME.pdf</span>
                <span className="text-muted-foreground">Download the real resume</span>
              </span>
            </span>
          </a>
        </Panel>
      </div>
    </div>
  );
}
