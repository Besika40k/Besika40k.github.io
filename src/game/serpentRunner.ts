// A small endless runner in the spirit of Chrome's offline dino game:
// a serpent slithers along the ground and jumps runestones (and, later, ravens).
// Framework-free; the React wrapper only mounts it and passes labels.

import { subscribeToTheme } from '@/lib/theme';

export interface RunnerLabels {
  start: string;
  over: string;
  retry: string;
  best: string;
}

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
const BEST_KEY = 'serpent-runner-best';

// Physics, in CSS pixels and seconds.
const GRAVITY = 2300;
const JUMP_VELOCITY = 680;
const RELEASE_VELOCITY = 260; // letting go early cuts the jump short
const START_SPEED = 320;
const MAX_SPEED = 720;
const ACCELERATION = 7;
const RAVENS_FROM_SCORE = 350;

const BODY_SEGMENTS = 16;
const SEGMENT_SPACING = 3.4;
const BODY_RADIUS = 6.2;
const TAIL_RADIUS = 1.6;

type Stone = { kind: 'stone'; x: number; w: number; h: number; rune: string };
type Raven = { kind: 'raven'; x: number; w: number; h: number; altitude: number };
type Obstacle = Stone | Raven;
type State = 'idle' | 'running' | 'over';

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const saveBest = (value: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Storage blocked; the best score just won't persist.
  }
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const pad = (n: number) => String(Math.floor(n)).padStart(5, '0');

const isInteractive = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  target.closest('a, button, input, textarea, select, [contenteditable="true"]') !== null;

export function createSerpentRunner(canvas: HTMLCanvasElement, initialLabels: RunnerLabels) {
  const ctx = canvas.getContext('2d')!;
  let labels = initialLabels;

  let width = 0;
  let height = 0;
  let state: State = 'idle';
  let best = readBest();
  let score = 0;
  let speed = START_SPEED;
  let nextSpawn = 0;
  let distance = 0;
  let obstacles: Obstacle[] = [];
  let pebbles: { x: number; y: number; w: number }[] = [];
  let phase = 0;
  let frame = 0;
  let last = 0;
  let visible = true;

  const player = { x: 64, altitude: 0, velocity: 0, holding: false };
  // Body as a follow-the-leader chain (screen x, altitude above ground), head first.
  let segments: { x: number; altitude: number }[] = [];
  const layBody = () => {
    segments = Array.from({ length: BODY_SEGMENTS }, (_, i) => ({
      x: player.x - i * SEGMENT_SPACING,
      altitude: 0,
    }));
  };
  layBody();
  const radius = (i: number) =>
    TAIL_RADIUS + (BODY_RADIUS - TAIL_RADIUS) * (1 - (i / (BODY_SEGMENTS - 1)) ** 1.5);

  const groundY = () => height - 26;

  const colours = () => {
    const css = getComputedStyle(canvas);
    const get = (name: string) => css.getPropertyValue(name).trim();
    return {
      serpent: get('--ink'),
      stone: get('--slate'),
      rune: get('--surface'),
      ground: get('--line'),
      text: get('--ink-muted'),
      eye: get('--ember'),
    };
  };

  const seedPebbles = () => {
    pebbles = [];
    for (let x = random(10, 40); x < width; x += random(20, 60)) {
      pebbles.push({ x, y: random(5, 14), w: random(1.5, 4) });
    }
  };

  // ── State changes
  const reset = () => {
    score = 0;
    distance = 0;
    speed = START_SPEED;
    nextSpawn = 380;
    obstacles = [];
    player.altitude = 0;
    player.velocity = 0;
    layBody();
  };

  const start = () => {
    reset();
    state = 'running';
    last = performance.now();
    frame = requestAnimationFrame(loop);
  };

  const gameOver = () => {
    state = 'over';
    if (score > best) {
      best = Math.floor(score);
      saveBest(best);
    }
    cancelAnimationFrame(frame);
    draw();
  };

  const press = () => {
    if (state !== 'running') {
      start();
    }
    player.holding = true;
    if (player.altitude === 0) player.velocity = JUMP_VELOCITY;
  };

  const release = () => {
    player.holding = false;
    if (player.velocity > RELEASE_VELOCITY) player.velocity = RELEASE_VELOCITY;
  };

  // ── Simulation
  const spawn = () => {
    const ravensAllowed = score >= RAVENS_FROM_SCORE;
    if (ravensAllowed && Math.random() < 0.3) {
      const altitude = [8, 36, 74][Math.floor(Math.random() * 3)];
      obstacles.push({ kind: 'raven', x: width + 20, w: 28, h: 14, altitude });
    } else {
      const count = Math.random() < 0.25 ? 2 : 1;
      let x = width + 10;
      for (let i = 0; i < count; i++) {
        const w = random(15, 24);
        obstacles.push({
          kind: 'stone',
          x,
          w,
          h: random(24, count > 1 ? 38 : 46),
          rune: RUNES[Math.floor(Math.random() * RUNES.length)],
        });
        x += w + 5;
      }
    }
    nextSpawn = distance + speed * random(0.85, 1.6) + 140;
  };

  const bodyPoints = () => {
    const ground = groundY();
    return segments.map((segment, i) => {
      const r = radius(i);
      // Travelling humps along the body while it slithers on the ground.
      const grounded = segment.altitude < 0.5;
      const hump = grounded && i > 1 ? Math.max(0, Math.sin(phase - i * 0.7)) * 3.4 : 0;
      return { x: segment.x, y: ground - segment.altitude - r - hump, r };
    });
  };

  const hits = (points: { x: number; y: number; r: number }[], o: Obstacle) => {
    const inset = 2;
    const top = o.kind === 'stone' ? groundY() - o.h : groundY() - o.altitude - o.h;
    const rect = { l: o.x + inset, r: o.x + o.w - inset, t: top + inset, b: top + o.h - inset };
    return points.some((p) => {
      const cx = Math.max(rect.l, Math.min(p.x, rect.r));
      const cy = Math.max(rect.t, Math.min(p.y, rect.b));
      return (p.x - cx) ** 2 + (p.y - cy) ** 2 < p.r * p.r;
    });
  };

  const update = (dt: number) => {
    speed = Math.min(MAX_SPEED, speed + ACCELERATION * dt);
    distance += speed * dt;
    score += (speed * dt) / 12;
    phase += dt * (speed / 28);

    // Jump physics
    if (player.altitude > 0 || player.velocity > 0) {
      player.velocity -= GRAVITY * dt;
      player.altitude = Math.max(0, player.altitude + player.velocity * dt);
      if (player.altitude === 0) player.velocity = 0;
    }
    // The head leads; every other segment drifts back with the ground and is pulled
    // to stay one spacing behind the segment ahead, so the body traces the jump arc.
    segments[0] = { x: player.x, altitude: player.altitude };
    for (let i = 1; i < segments.length; i++) {
      const ahead = segments[i - 1];
      const segment = segments[i];
      segment.x -= speed * dt;
      const dx = segment.x - ahead.x;
      const dy = segment.altitude - ahead.altitude;
      const length = Math.hypot(dx, dy) || 1;
      if (length > SEGMENT_SPACING) {
        segment.x = ahead.x + (dx / length) * SEGMENT_SPACING;
        segment.altitude = Math.max(0, ahead.altitude + (dy / length) * SEGMENT_SPACING);
      }
    }

    for (const o of obstacles) o.x -= speed * dt;
    obstacles = obstacles.filter((o) => o.x + o.w > -10);
    if (distance >= nextSpawn) spawn();

    for (const p of pebbles) p.x -= speed * dt;
    pebbles = pebbles.filter((p) => p.x + p.w > 0);
    while (pebbles.length < width / 40) {
      const lastX = pebbles.length ? pebbles[pebbles.length - 1].x : 0;
      pebbles.push({ x: lastX + random(20, 60), y: random(5, 14), w: random(1.5, 4) });
    }

    const points = bodyPoints();
    // Only the front half collides: a trailing tail clipping a stone the head cleared feels unfair.
    const snout = { x: points[0].x + 8, y: points[0].y, r: 3.5 };
    const sample = [snout, points[0], points[2], points[4], points[7]];
    if (obstacles.some((o) => hits(sample, o))) gameOver();
  };

  // ── Drawing
  const drawSerpent = (c: ReturnType<typeof colours>) => {
    const points = bodyPoints();
    // One continuous tapered stroke from tail to neck.
    ctx.strokeStyle = c.serpent;
    ctx.lineCap = 'round';
    for (let i = points.length - 1; i > 0; i--) {
      const from = points[i];
      const to = points[i - 1];
      ctx.lineWidth = from.r + to.r;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
    // Wedge-shaped head with a pointed snout, tilted along the neck.
    const head = points[0];
    const neck = points[1];
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(Math.atan2(head.y - neck.y, head.x - neck.x));
    ctx.fillStyle = c.serpent;
    ctx.beginPath();
    ctx.moveTo(-4, -6.4);
    ctx.quadraticCurveTo(8, -6.6, 14.5, 0.8);
    ctx.quadraticCurveTo(7, 5.8, -4, 6.2);
    ctx.closePath();
    ctx.fill();
    // Narrow slanted eye.
    ctx.fillStyle = c.eye;
    ctx.beginPath();
    ctx.ellipse(4.6, -2, 2, 1, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawStone = (o: Stone, c: ReturnType<typeof colours>) => {
    const top = groundY() - o.h;
    const radius = o.w / 2;
    ctx.fillStyle = c.stone;
    ctx.beginPath();
    ctx.moveTo(o.x, groundY());
    ctx.lineTo(o.x, top + radius);
    ctx.arc(o.x + radius, top + radius, radius, Math.PI, 0);
    ctx.lineTo(o.x + o.w, groundY());
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = c.rune;
    ctx.font = `${Math.round(o.w * 0.75)}px "Noto Sans Runic", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(o.rune, o.x + radius, top + o.h * 0.55);
  };

  const drawRaven = (o: Raven, c: ReturnType<typeof colours>) => {
    const y = groundY() - o.altitude - o.h / 2;
    const wingsUp = Math.floor(phase / 3) % 2 === 0;
    ctx.fillStyle = c.serpent;
    ctx.beginPath();
    ctx.ellipse(o.x + 14, y, 10, 3.6, -0.08, 0, Math.PI * 2); // body
    ctx.fill();
    ctx.beginPath(); // beak
    ctx.moveTo(o.x + 2, y - 1.5);
    ctx.lineTo(o.x - 3, y);
    ctx.lineTo(o.x + 3, y + 1);
    ctx.fill();
    ctx.beginPath(); // wing
    ctx.moveTo(o.x + 10, y);
    ctx.lineTo(o.x + 20, wingsUp ? y - 11 : y + 11);
    ctx.lineTo(o.x + 21, y);
    ctx.fill();
    ctx.beginPath(); // tail
    ctx.moveTo(o.x + 23, y - 1);
    ctx.lineTo(o.x + 29, y - 3);
    ctx.lineTo(o.x + 29, y + 2);
    ctx.fill();
  };

  const drawText = (c: ReturnType<typeof colours>) => {
    ctx.textBaseline = 'top';
    ctx.textAlign = 'right';
    ctx.font = '500 12px "Schibsted Grotesk Variable", system-ui, sans-serif';
    ctx.fillStyle = c.text;
    ctx.fillText(`${labels.best} ${pad(best)}   ${pad(score)}`, width - 14, 12);

    if (state === 'running') return;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const mid = groundY() / 2 + 6;
    if (state === 'over') {
      ctx.font = '600 20px "Grenze Variable", Georgia, serif';
      ctx.fillStyle = c.serpent;
      ctx.fillText(labels.over, width / 2, mid - 12);
      ctx.font = '13px "Schibsted Grotesk Variable", system-ui, sans-serif';
      ctx.fillStyle = c.text;
      ctx.fillText(labels.retry, width / 2, mid + 12);
    } else {
      ctx.font = '13px "Schibsted Grotesk Variable", system-ui, sans-serif';
      ctx.fillStyle = c.text;
      ctx.fillText(labels.start, width / 2, mid);
    }
  };

  const draw = () => {
    if (!width || !height) return;
    const c = colours();
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = c.ground;
    ctx.fillRect(0, groundY(), width, 1);
    for (const p of pebbles) ctx.fillRect(p.x, groundY() + p.y, p.w, 1);

    for (const o of obstacles) {
      if (o.kind === 'stone') drawStone(o, c);
      else drawRaven(o, c);
    }
    drawSerpent(c);
    drawText(c);
  };

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    if (state !== 'running') return;
    draw();
    frame = requestAnimationFrame(loop);
  }

  // ── Sizing
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    player.x = Math.min(72, width * 0.2);
    if (state !== 'running') {
      layBody();
      seedPebbles();
    }
    draw();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibility.observe(canvas);

  // ── Input: Space / ↑ / W anywhere while the game is on screen, or tap/click the canvas.
  const isJumpKey = (e: KeyboardEvent) => e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w';
  const onKeyDown = (e: KeyboardEvent) => {
    if (!isJumpKey(e) || !visible || isInteractive(e.target)) return;
    e.preventDefault();
    if (!e.repeat) press();
  };
  const onKeyUp = (e: KeyboardEvent) => {
    if (isJumpKey(e)) release();
  };
  const onPointerDown = (e: PointerEvent) => {
    e.preventDefault();
    press();
  };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', release);

  // Colours come from CSS variables, so repaint idle frames when the theme flips.
  const unsubscribeTheme = subscribeToTheme(() => {
    if (state !== 'running') requestAnimationFrame(draw);
  });

  // Draw once the rune font is ready so the first stones aren't blank.
  document.fonts?.load('16px "Noto Sans Runic"').then(draw, draw);

  return {
    setLabels(next: RunnerLabels) {
      labels = next;
      if (state !== 'running') draw();
    },
    /** Redraw with current CSS colours (e.g. after a theme change). */
    redraw: draw,
    destroy() {
      cancelAnimationFrame(frame);
      unsubscribeTheme();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
    },
  };
}
