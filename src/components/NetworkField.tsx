import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface Node {
  x: number;
  y: number;
  /** Where it rests, and how it drifts around that point. */
  hx: number;
  hy: number;
  phase: number;
  speed: number;
  r: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
  threat: boolean;
}

const LINK = 150;
const POINTER = 220;

/**
 * The hero's signature: a living network. Nodes drift around their place, link to their neighbours,
 * and packets travel along the links; now and then a red one tries to get through and is stopped at a
 * node, which flashes. The pointer lights up the network around it and pushes the nodes aside.
 * Drawn in a 2D canvas, paused when out of sight or in a background tab, still for reduced motion.
 */
export default function NetworkField({ className = "", density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let links: [number, number][] = [];
    const packets: Packet[] = [];
    const flashes = new Map<number, number>();
    const pointer = { x: -9999, y: -9999, active: false };
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const build = () => {
      const box = canvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // A jittered grid, so the network covers the space evenly without looking like a grid.
      const cell = Math.max(78, Math.sqrt((w * h) / (110 * density)));
      nodes = [];
      for (let gy = cell / 2; gy < h + cell / 2; gy += cell) {
        for (let gx = cell / 2; gx < w + cell / 2; gx += cell) {
          const hx = gx + (Math.random() - 0.5) * cell * 0.9;
          const hy = gy + (Math.random() - 0.5) * cell * 0.9;
          nodes.push({ x: hx, y: hy, hx, hy, phase: Math.random() * Math.PI * 2, speed: 0.2 + Math.random() * 0.5, r: Math.random() < 0.12 ? 2.4 : 1.3 });
        }
      }
      links = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].hx - nodes[j].hx;
          const dy = nodes[i].hy - nodes[j].hy;
          if (dx * dx + dy * dy < LINK * LINK) links.push([i, j]);
        }
      }
      packets.length = 0;
    };

    const spawn = () => {
      if (!links.length) return;
      const [a, b] = links[Math.floor(Math.random() * links.length)];
      const flip = Math.random() < 0.5;
      packets.push({ a: flip ? b : a, b: flip ? a : b, t: 0, speed: 0.35 + Math.random() * 0.5, threat: Math.random() < 0.14 });
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;
      ctx.clearRect(0, 0, w, h);

      // Drift, and make room for the pointer.
      for (const n of nodes) {
        let tx = n.hx + Math.cos(time * n.speed + n.phase) * 9;
        let ty = n.hy + Math.sin(time * n.speed * 1.3 + n.phase) * 9;
        if (pointer.active) {
          const dx = tx - pointer.x;
          const dy = ty - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER && d > 0.01) {
            const push = (1 - d / POINTER) ** 2 * 46;
            tx += (dx / d) * push;
            ty += (dy / d) * push;
          }
        }
        n.x += (tx - n.x) * Math.min(1, dt * 6);
        n.y += (ty - n.y) * Math.min(1, dt * 6);
      }

      // Links: faint everywhere, lit in blue near the pointer.
      ctx.lineWidth = 1;
      for (const [i, j] of links) {
        const a = nodes[i];
        const b = nodes[j];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const d = pointer.active ? Math.hypot(mx - pointer.x, my - pointer.y) : Infinity;
        const lit = d < POINTER ? 1 - d / POINTER : 0;
        ctx.strokeStyle = lit > 0 ? `rgba(61,149,242,${0.07 + lit * 0.5})` : "rgba(236,238,242,0.075)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const d = pointer.active ? Math.hypot(n.x - pointer.x, n.y - pointer.y) : Infinity;
        const lit = d < POINTER ? 1 - d / POINTER : 0;
        const flash = flashes.get(i) ?? 0;
        if (flash > 0) {
          ctx.fillStyle = `rgba(255,90,99,${flash * 0.25})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4 + (1 - flash) * 16, 0, Math.PI * 2);
          ctx.fill();
          flashes.set(i, flash - dt * 1.4);
          if (flash - dt * 1.4 <= 0) flashes.delete(i);
        }
        ctx.fillStyle = lit > 0 ? `rgba(140,194,251,${0.35 + lit * 0.65})` : n.r > 2 ? "rgba(236,238,242,0.42)" : "rgba(236,238,242,0.3)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + lit * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets: blue ones arrive; a red one is stopped at the node it reaches.
      if (Math.random() < dt * 2.2 && packets.length < 26) spawn();
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.t += dt * p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          packets.splice(k, 1);
          continue;
        }
        if (p.t >= 1) {
          if (p.threat) flashes.set(p.b, 1);
          packets.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const color = p.threat ? "255,90,99" : "140,194,251";
        const tail = 0.12;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - tail);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - tail);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${color},0)`);
        grad.addColorStop(1, `rgba(${color},0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgb(${color})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (reduced || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    build();
    if (reduced) draw(performance.now());
    else start();

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);

    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
      pointer.active = pointer.y > -40 && pointer.y < box.height + 40;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      frame = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none block h-full w-full ${className}`} />;
}
