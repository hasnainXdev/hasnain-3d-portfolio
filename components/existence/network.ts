export const NODE_COUNT = 24;
export const LAYER_SIZE = 6;
export const PROJECT_INDICES = [0, 2, 3, 5] as const;

export function nodePosition(index: number, time: number, energy: number): [number, number, number] {
  const layer = Math.floor(index / LAYER_SIZE);
  const slot = index % LAYER_SIZE;
  const angle = (slot / LAYER_SIZE) * Math.PI * 2 + layer * 0.7 + time * 0.05;
  const radius = 0.95 + layer * 0.16 + Math.sin(time * 0.4 + index) * 0.05 * energy;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * 0.72,
    (layer - 1.5) * 0.6 + Math.sin(time * 0.3 + index * 1.7) * 0.07 * energy,
  ];
}

export const nodePositionGLSL = /* glsl */ `
vec3 nodePosition(float index, float time, float energy) {
  float layer = floor(index / ${LAYER_SIZE.toFixed(1)});
  float slot = mod(index, ${LAYER_SIZE.toFixed(1)});
  float angle = slot / ${LAYER_SIZE.toFixed(1)} * 6.2831853 + layer * 0.7 + time * 0.05;
  float radius = 0.95 + layer * 0.16 + sin(time * 0.4 + index) * 0.05 * energy;
  return vec3(
    cos(angle) * radius,
    sin(angle) * radius * 0.72,
    (layer - 1.5) * 0.6 + sin(time * 0.3 + index * 1.7) * 0.07 * energy
  );
}
`;

export const CONNECTIONS: ReadonlyArray<readonly [number, number]> = (() => {
  const pairs: [number, number][] = [];
  for (let layer = 0; layer < NODE_COUNT / LAYER_SIZE; layer++) {
    for (let slot = 0; slot < LAYER_SIZE; slot++) {
      const a = layer * LAYER_SIZE + slot;
      pairs.push([a, layer * LAYER_SIZE + ((slot + 1) % LAYER_SIZE)]);
      pairs.push([a, layer * LAYER_SIZE + ((slot + 2) % LAYER_SIZE)]);
      if (layer < NODE_COUNT / LAYER_SIZE - 1) {
        pairs.push([a, (layer + 1) * LAYER_SIZE + slot]);
        pairs.push([a, (layer + 1) * LAYER_SIZE + ((slot + 2) % LAYER_SIZE)]);
      }
    }
  }
  return pairs;
})();

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
}

export function nodeScreenPosition(
  index: number,
  time: number,
  energy: number,
  network: number,
  exit: number,
  mouseX: number,
  mouseY: number,
  mouseStrength: number,
  pinned = false
): [number, number, number] {
  const [x, y, z] = nodePosition(index, time, energy);
  const pulse = Math.sin(time * 1.1 + index * 0.9) * 0.5 + 0.5;
  const length = Math.max(0.0001, Math.hypot(x, y, z));
  let px = x + (x / length) * pulse * 0.06 * energy * network + (x / length) * exit * 0.55;
  let py = y + (y / length) * pulse * 0.06 * energy * network + (y / length) * exit * 0.55;
  const pz = z + (z / length) * pulse * 0.06 * energy * network + (z / length) * exit * 0.55;

  if (!pinned) {
    const dx = px - mouseX;
    const dy = py - mouseY;
    const dist = Math.max(0.0001, Math.hypot(dx, dy));
    const influence = Math.pow(1 - smoothstep(0, 1.55, dist), 1.7);
    const force = influence * mouseStrength * (1 + network * 0.35);
    const pull = 0.62 - network * 0.34;
    px += (dx / dist) * pull * force;
    py += (dy / dist) * pull * force;
  }

  return [px, py, pz];
}
