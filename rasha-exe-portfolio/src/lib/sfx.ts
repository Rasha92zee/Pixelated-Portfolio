/** Tiny original WebAudio blip engine — no assets, no autoplay. */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Note = { f: number; d: number; t?: OscillatorType; v?: number };

function play(notes: Note[]) {
  const ac = audio();
  if (!ac) return;
  let at = ac.currentTime;
  for (const n of notes) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = n.t ?? "square";
    osc.frequency.setValueAtTime(n.f, at);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(n.v ?? 0.05, at + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + n.d);
    osc.connect(gain).connect(ac.destination);
    osc.start(at);
    osc.stop(at + n.d + 0.02);
    at += n.d;
  }
}

export const sfx = {
  key: () => play([{ f: 1400, d: 0.02, v: 0.025 }]),
  move: () => play([{ f: 620, d: 0.05 }]),
  select: () => play([{ f: 880, d: 0.05 }, { f: 1320, d: 0.07 }]),
  back: () => play([{ f: 480, d: 0.06 }, { f: 320, d: 0.08 }]),
  pickup: () => play([{ f: 1046, d: 0.05 }, { f: 1568, d: 0.09 }]),
  unlock: () =>
    play([
      { f: 784, d: 0.07 },
      { f: 988, d: 0.07 },
      { f: 1319, d: 0.14 },
    ]),
  boot: () =>
    play([
      { f: 392, d: 0.1, t: "triangle" },
      { f: 523, d: 0.1, t: "triangle" },
      { f: 784, d: 0.22, t: "triangle" },
    ]),
  error: () => play([{ f: 200, d: 0.18, t: "sawtooth", v: 0.04 }]),
};

export type SfxName = keyof typeof sfx;

/* ---- Subtle looping chiptune background music (original, generated live) ---- */

const BASS = [110, 110, 146.83, 130.81]; // A2 A2 D3 C3
const LEAD = [
  440, 523.25, 659.25, 523.25, 440, 392, 440, 523.25, 587.33, 523.25, 440, 392, 349.23, 392, 440,
  523.25,
];

let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicGain: GainNode | null = null;
let step = 0;

const STEP = 0.26; // seconds per step

function voice(ac: AudioContext, out: GainNode, f: number, d: number, t: OscillatorType, v: number) {
  const at = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = t;
  osc.frequency.setValueAtTime(f, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(v, at + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, at + d);
  osc.connect(g).connect(out);
  osc.start(at);
  osc.stop(at + d + 0.05);
}

export function startMusic() {
  if (musicTimer) return;
  const ac = audio();
  if (!ac) return;
  musicGain = ac.createGain();
  musicGain.gain.setValueAtTime(0.0001, ac.currentTime);
  musicGain.gain.exponentialRampToValueAtTime(0.16, ac.currentTime + 1.2);
  musicGain.connect(ac.destination);

  const tick = () => {
    const a = audio();
    if (!a || !musicGain) return;
    if (step % 4 === 0) voice(a, musicGain, BASS[(step / 4) % BASS.length]!, 0.42, "triangle", 0.28);
    if (step % 2 === 0) voice(a, musicGain, LEAD[step % LEAD.length]!, 0.16, "square", 0.07);
    if (step % 8 === 4) voice(a, musicGain, 1760, 0.05, "square", 0.03);
    step += 1;
  };
  tick();
  musicTimer = setInterval(tick, STEP * 1000);
}

export function stopMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  const ac = ctx;
  if (musicGain && ac) {
    const g = musicGain;
    musicGain = null;
    try {
      g.gain.cancelScheduledValues(ac.currentTime);
      g.gain.setValueAtTime(g.gain.value, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.6);
      setTimeout(() => g.disconnect(), 800);
    } catch {
      g.disconnect();
    }
  }
  step = 0;
}
