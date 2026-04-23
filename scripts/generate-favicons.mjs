import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const SOURCE_SVG = "public/brand/logo/svg/veylon-icon-color.svg";
/** `--color-navy-900` in `src/app/globals.css` (exact match to logo stroke). */
const BRAND_NAVY = "#0a2540";
const APP_DIR = "src/app";
const PUBLIC_DIR = "public";

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function renderPng(size, { background = null, padding = 0 } = {}) {
  const svg = await readFile(SOURCE_SVG);
  const iconSize = size - padding * 2;
  const iconBuffer = await sharp(svg)
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  if (!background) return await sharp(iconBuffer).png().toBuffer();

  return await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: iconBuffer, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  await ensureDir(APP_DIR);
  await ensureDir(PUBLIC_DIR);

  // Browser tab — 32x32 transparent
  await writeFile(path.join(APP_DIR, "icon.png"), await renderPng(32));

  // iOS home screen — 180x180 with brand navy background
  await writeFile(
    path.join(APP_DIR, "apple-icon.png"),
    await renderPng(180, { background: BRAND_NAVY, padding: 24 }),
  );

  // Android / PWA
  await writeFile(
    path.join(PUBLIC_DIR, "icon-192.png"),
    await renderPng(192, { background: BRAND_NAVY, padding: 26 }),
  );
  await writeFile(
    path.join(PUBLIC_DIR, "icon-512.png"),
    await renderPng(512, { background: BRAND_NAVY, padding: 70 }),
  );

  // Legacy ICO — multi-size 16/32/48
  const ico16 = await renderPng(16);
  const ico32 = await renderPng(32);
  const ico48 = await renderPng(48);
  const icoBuffer = await pngToIco([ico16, ico32, ico48]);
  await writeFile(path.join(APP_DIR, "favicon.ico"), icoBuffer);

  // Copy source SVG as vector fallback
  const svg = await readFile(SOURCE_SVG);
  await writeFile(path.join(APP_DIR, "icon.svg"), svg);

  console.log("✓ Favicon pipeline complete.");
  console.log("  " + path.join(APP_DIR, "favicon.ico"));
  console.log("  " + path.join(APP_DIR, "icon.png"));
  console.log("  " + path.join(APP_DIR, "icon.svg"));
  console.log("  " + path.join(APP_DIR, "apple-icon.png"));
  console.log("  " + path.join(PUBLIC_DIR, "icon-192.png"));
  console.log("  " + path.join(PUBLIC_DIR, "icon-512.png"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
