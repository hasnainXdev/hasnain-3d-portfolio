export type ParticleData = {
  voidPositions: Float32Array;
  targetPositions: Float32Array;
  seeds: Float32Array;
  luminance: Float32Array;
  colors: Float32Array;
  features: Float32Array;
  count: number;
};

type Candidate = {
  x: number;
  y: number;
  lum: number;
  feature: number;
  color: [number, number, number];
};

function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function srgbToLinear(value: number) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value: number) {
  return value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
}

function toneMap(value: number) {
  return (value * (2.51 * value + 0.03)) / (value * (2.43 * value + 0.59) + 0.14);
}

function enhanceColor(r: number, g: number, b: number): [number, number, number] {
  const linearR = srgbToLinear(r / 255);
  const linearG = srgbToLinear(g / 255);
  const linearB = srgbToLinear(b / 255);
  const luma = 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
  const mapped = Math.min(1, toneMap(luma * 4.2 + 0.008));
  const scale = luma > 0.0001 ? mapped / luma : 0;
  const shadowLift = 0.004;

  return [
    linearToSrgb(Math.min(1, linearR * scale + shadowLift)),
    linearToSrgb(Math.min(1, linearG * scale + shadowLift)),
    linearToSrgb(Math.min(1, linearB * scale + shadowLift)),
  ];
}

function bell(x: number, y: number, cx: number, cy: number, sx: number, sy: number) {
  const dx = (x - cx) / sx;
  const dy = (y - cy) / sy;
  return Math.exp(-0.5 * (dx * dx + dy * dy));
}

function facialFeatureWeight(x: number, y: number) {
  const eyes = Math.max(
    bell(x, y, -0.15, 0.4, 0.13, 0.075),
    bell(x, y, 0.17, 0.4, 0.13, 0.075)
  );
  const nose = bell(x, y, 0.02, 0.2, 0.1, 0.14);
  const mouth = bell(x, y, 0.02, 0.02, 0.15, 0.075);
  const jaw = bell(x, y, 0.03, -0.16, 0.26, 0.09);
  return Math.max(eyes, nose, mouth, jaw);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Portrait could not be loaded"));
    image.src = src;
  });
}

function assemble(candidates: Candidate[], count: number, random: () => number): ParticleData {
  const length = Math.min(count, candidates.length);
  const voidPositions = new Float32Array(length * 3);
  const targetPositions = new Float32Array(length * 3);
  const seeds = new Float32Array(length * 3);
  const luminance = new Float32Array(length);
  const colors = new Float32Array(length * 3);
  const features = new Float32Array(length);

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = candidates[i];
    candidates[i] = candidates[j];
    candidates[j] = temp;
  }

  for (let i = 0; i < length; i++) {
    const point = candidates[i];
    const index = i * 3;

    targetPositions[index] = point.x + (random() - 0.5) * 0.006;
    targetPositions[index + 1] = point.y + (random() - 0.5) * 0.006;
    targetPositions[index + 2] = (random() - 0.5) * 0.05;

    const radius = 1.5 + random() * 1.3;
    const vertical = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const ring = Math.sqrt(1 - vertical * vertical);
    voidPositions[index] = Math.cos(angle) * ring * radius;
    voidPositions[index + 1] = Math.sin(angle) * ring * radius;
    voidPositions[index + 2] = vertical * radius;

    seeds[index] = random();
    seeds[index + 1] = random();
    seeds[index + 2] = random();
    luminance[i] = point.lum;
    colors[index] = point.color[0];
    colors[index + 1] = point.color[1];
    colors[index + 2] = point.color[2];
    features[i] = point.feature;
  }

  return { voidPositions, targetPositions, seeds, luminance, colors, features, count: length };
}

function fallback(count: number): ParticleData {
  const random = createRandom(9182);
  const candidates: Candidate[] = [];

  while (candidates.length < count) {
    const x = random() * 2 - 1;
    const y = random() * 2.2 - 1.1;
    const head = (x / 0.44) ** 2 + ((y - 0.44) / 0.52) ** 2 < 1;
    const shoulders = y < -0.16 && (x / 0.98) ** 2 + ((y + 0.74) / 0.44) ** 2 < 1;
    if (!head && !shoulders) continue;
    const lum = 0.22 + random() * 0.78;
    candidates.push({ x, y, lum, feature: 0.25, color: [lum, lum, lum] });
  }

  return assemble(candidates, count, random);
}

export async function samplePortrait(src: string, count: number): Promise<ParticleData> {
  if (typeof document === "undefined") return fallback(count);

  let image: HTMLImageElement;
  try {
    image = await loadImage(src);
  } catch {
    return fallback(count);
  }

  const size = 280;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return fallback(count);

  context.drawImage(image, 0, 0, size, size);
  const pixels = context.getImageData(0, 0, size, size).data;

  let minX = size;
  let minY = size;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (pixels[(y * size + x) * 4 + 3] < 48) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX <= minX || maxY <= minY) return fallback(count);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const half = Math.max(maxX - minX, maxY - minY) / 2;
  const alphaAt = (x: number, y: number) => {
    const px = Math.max(0, Math.min(size - 1, x));
    const py = Math.max(0, Math.min(size - 1, y));
    return pixels[(py * size + px) * 4 + 3] / 255;
  };
  const lightAt = (x: number, y: number) => {
    const px = Math.max(0, Math.min(size - 1, x));
    const py = Math.max(0, Math.min(size - 1, y));
    const offset = (py * size + px) * 4;
    return (
      (0.2126 * pixels[offset] + 0.7152 * pixels[offset + 1] + 0.0722 * pixels[offset + 2]) / 255
    );
  };

  const selector = createRandom(2201);
  const candidates: Candidate[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const offset = (y * size + x) * 4;
      const alpha = pixels[offset + 3];
      if (alpha < 48) continue;

      const lightness = lightAt(x, y);
      const contrast =
        Math.abs(lightness - lightAt(x + 2, y)) + Math.abs(lightness - lightAt(x, y + 2));
      const silhouette =
        Math.abs(alpha / 255 - alphaAt(x + 2, y)) + Math.abs(alpha / 255 - alphaAt(x, y + 2));
      const nx = (x - centerX) / half;
      const ny = (centerY - y) / half;
      const feature = facialFeatureWeight(nx, ny);
      const detail = Math.min(0.5, contrast * 2.6 + silhouette * 0.35);

      if (selector() > 0.42 + detail + feature * 0.5) continue;

      const alphaScale = alpha / 255;
      const enhanced = enhanceColor(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
      const enhancedLuma =
        0.2126 * enhanced[0] + 0.7152 * enhanced[1] + 0.0722 * enhanced[2];
      candidates.push({
        x: nx,
        y: ny,
        lum: Math.min(
          1,
          0.12 +
            enhancedLuma * 0.7 +
            Math.min(0.22, contrast * 1.3 + silhouette * 0.18) +
            feature * 0.08
        ),
        feature,
        color: [
          enhanced[0] * alphaScale,
          enhanced[1] * alphaScale,
          enhanced[2] * alphaScale,
        ],
      });
    }
  }

  if (candidates.length === 0) return fallback(count);
  return assemble(candidates, count, createRandom(4471));
}
