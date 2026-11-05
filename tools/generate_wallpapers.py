"""Generate the vPC wallpapers (original artwork, macOS-inspired soft layered waves).

Usage:
    python tools/generate_wallpapers.py            # 3840x2160 into ./wallpapers
    python tools/generate_wallpapers.py --width 2560 --height 1440

Requires numpy and Pillow.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


def hex_rgb(value: str) -> np.ndarray:
    value = value.lstrip("#")
    return np.array([int(value[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float64) / 255.0


def lerp_colors(stops: list[str], t: np.ndarray) -> np.ndarray:
    """Interpolate a list of hex colors over t in [0, 1] (any shape). Returns (..., 3)."""
    cols = np.stack([hex_rgb(c) for c in stops])
    t = np.clip(t, 0.0, 1.0) * (len(stops) - 1)
    i0 = np.floor(t).astype(int)
    i1 = np.minimum(i0 + 1, len(stops) - 1)
    f = (t - i0)[..., None]
    f = f * f * (3 - 2 * f)  # smoothstep between stops: no visible kinks
    return cols[i0] * (1 - f) + cols[i1] * f


def smoothstep(e0: float, e1: float, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def wave_edge(xn: np.ndarray, rng: np.random.Generator, base: float, amp: float) -> np.ndarray:
    """Smooth random curve (sum of a few low-frequency sines), xn in [0, 1]."""
    y = np.full_like(xn, base)
    for k, weight in ((0.55, 1.0), (1.1, 0.55), (1.9, 0.25), (3.3, 0.1)):
        freq = k * rng.uniform(0.8, 1.25)
        phase = rng.uniform(0, 2 * np.pi)
        y += amp * weight * np.sin(2 * np.pi * freq * xn + phase)
    return y


def render_waves(w: int, h: int, palette: dict, seed: int) -> Image.Image:
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    xn, yn = xx / w, yy / h

    # Sky: vertical gradient with a soft radial glow.
    img = lerp_colors(palette["sky"], yn)
    gx, gy, gr = palette["glow_pos"]
    d = np.sqrt(((xn - gx) * (w / h)) ** 2 + (yn - gy) ** 2)
    glow = np.exp(-((d / gr) ** 2))[..., None]
    img = img * (1 - glow * palette["glow_strength"]) + hex_rgb(palette["glow"]) * glow * palette["glow_strength"]

    layers = palette["layers"]
    n = len(layers)
    x1 = np.linspace(0, 1, w)
    for i, stops in enumerate(layers):
        depth = i / max(n - 1, 1)
        base = palette["top"] + (palette["bottom"] - palette["top"]) * depth
        amp = palette["amp"] * (0.7 + 0.6 * rng.uniform())
        edge = wave_edge(x1, rng, base, amp)[None, :]  # (1, w), in yn units

        dist = yn - edge  # >0 below the edge (inside the layer)
        px = 1.0 / h

        # Soft shadow cast upward onto what is behind this layer.
        shadow = (np.exp(-np.clip(-dist, 0, None) / palette["shadow_len"]) * (dist < 0))[..., None]
        s = palette["shadow"] * shadow
        img = img * (1 - s) + hex_rgb(palette["shadow_color"]) * img * s

        # Layer fill: diagonal gradient + slight darkening with depth inside the layer.
        t = np.clip(0.65 * xn + 0.35 * np.clip(dist / 0.35, 0, 1), 0, 1)
        fill = lerp_colors(stops, t)
        fill *= (1 - 0.18 * smoothstep(0.0, 0.5, dist))[..., None]

        # Thin luminous rim along the crest.
        rim = np.exp(-np.abs(dist) / (2.2 * px)) * (dist > -px)
        fill = fill + palette["rim"] * rim[..., None]

        alpha = smoothstep(-1.2 * px, 1.2 * px, dist)[..., None]
        img = img * (1 - alpha) + fill * alpha

    # Vignette + fine grain (prevents banding on 8-bit displays).
    v = np.sqrt((xn - 0.5) ** 2 + (yn - 0.5) ** 2)
    img *= (1 - palette["vignette"] * smoothstep(0.35, 0.85, v))[..., None]
    img += rng.normal(0, 1.1 / 255, img.shape)

    out = Image.fromarray((np.clip(img, 0, 1) * 255 + 0.5).astype(np.uint8), "RGB")
    return out


def render_mesh(w: int, h: int, palette: dict, seed: int) -> Image.Image:
    """Blurred colour blobs, like a frosted aurora."""
    rng = np.random.default_rng(seed)
    sw, sh = w // 8, h // 8  # render small then upscale: blobs are very soft anyway
    yy, xx = np.mgrid[0:sh, 0:sw].astype(np.float64)
    xn, yn = xx / sw, yy / sh
    img = lerp_colors(palette["base"], yn * 0.7 + xn * 0.3)
    for color, (cx, cy, r, s) in palette["blobs"]:
        cx += rng.uniform(-0.03, 0.03)
        cy += rng.uniform(-0.03, 0.03)
        d2 = ((xn - cx) * (w / h)) ** 2 + (yn - cy) ** 2
        a = (np.exp(-d2 / (r * r)) * s)[..., None]
        img = img * (1 - a) + hex_rgb(color) * a
    small = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8), "RGB")
    small = small.filter(ImageFilter.GaussianBlur(radius=sw / 40))
    big = np.asarray(small.resize((w, h), Image.BICUBIC)).astype(np.float64) / 255.0
    big += rng.normal(0, 1.3 / 255, big.shape)
    return Image.fromarray((np.clip(big, 0, 1) * 255 + 0.5).astype(np.uint8), "RGB")


NIGHT = {
    "sky": ["#04051a", "#0f0c38", "#28145a"],
    "glow": "#d0428f",
    "glow_pos": (0.68, 0.46, 0.42),
    "glow_strength": 0.55,
    "top": 0.36,
    "bottom": 0.82,
    "amp": 0.065,
    "shadow": 0.55,
    "shadow_color": "#000000",
    "shadow_len": 0.06,
    "rim": 0.10,
    "vignette": 0.35,
    "layers": [
        ["#2b1a6b", "#4a2a8f", "#6c3aa8"],
        ["#3b1f7a", "#6b2c96", "#a03f9c"],
        ["#55218a", "#9b2f8f", "#e0577e"],
        ["#6a1f7d", "#c23a76", "#ff7a59"],
        ["#3d1260", "#8a2470", "#e2566a"],
        ["#1c0b3d", "#3e1559", "#7a2263"],
    ],
}

DAY = {
    "sky": ["#d9e6ff", "#efe8ff", "#ffe3ea"],
    "glow": "#fff4e6",
    "glow_pos": (0.30, 0.30, 0.55),
    "glow_strength": 0.60,
    "top": 0.36,
    "bottom": 0.82,
    "amp": 0.065,
    "shadow": 0.30,
    "shadow_color": "#6f7fd6",
    "shadow_len": 0.05,
    "rim": 0.08,
    "vignette": 0.10,
    "layers": [
        ["#c7d9ff", "#d9cffc", "#f3d4f0"],
        ["#a9c4ff", "#c4b5fb", "#f2bfe0"],
        ["#86abff", "#a99bf6", "#f5a9c8"],
        ["#5f8dff", "#8c7cf0", "#ff9fb0"],
        ["#3f73f2", "#6f5fe0", "#ff8a8a"],
        ["#2c58d6", "#5145c4", "#e86a86"],
    ],
}

AURORA = {
    "base": ["#101642", "#1b1d5c", "#2a1650"],
    "blobs": [
        ("#2f6bff", (0.18, 0.28, 0.45, 0.95)),
        ("#8a3ffc", (0.55, 0.18, 0.42, 0.90)),
        ("#ff4d8d", (0.88, 0.50, 0.38, 0.85)),
        ("#ff9f43", (0.66, 0.95, 0.34, 0.75)),
        ("#18c8c8", (0.12, 0.88, 0.36, 0.70)),
        ("#5b5bff", (0.42, 0.62, 0.30, 0.55)),
    ],
}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--width", type=int, default=3840)
    ap.add_argument("--height", type=int, default=2160)
    ap.add_argument("--out", type=Path, default=Path(__file__).resolve().parent.parent / "wallpapers")
    ap.add_argument("--preview", action="store_true", help="also write small PNG previews")
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)

    jobs = {
        "vpc-nuit": lambda: render_waves(args.width, args.height, NIGHT, seed=7),
        "vpc-jour": lambda: render_waves(args.width, args.height, DAY, seed=7),
        "vpc-aurore": lambda: render_mesh(args.width, args.height, AURORA, seed=3),
    }
    for name, job in jobs.items():
        img = job()
        path = args.out / f"{name}.jpg"
        img.save(path, quality=93, subsampling=0, optimize=True)
        print(f"{path}  {path.stat().st_size / 1e6:.1f} MB")
        if args.preview:
            prev = img.resize((960, 540), Image.LANCZOS)
            prev.save(args.out / f"{name}-preview.jpg", quality=88)


if __name__ == "__main__":
    main()
