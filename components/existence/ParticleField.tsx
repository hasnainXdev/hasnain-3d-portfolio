"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CONNECTIONS, PROJECT_INDICES, nodeScreenPosition } from "./network";
import type { ParticleData } from "./samplePortrait";
import { fragmentShader, vertexShader } from "./shaders";
import type { ExperienceState } from "./types";

type Props = {
  data: ParticleData;
  stateRef: React.RefObject<ExperienceState>;
  reducedMotion: boolean;
  projectNodeRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
};

export default function ParticleField({
  data,
  stateRef,
  reducedMotion,
  projectNodeRefs,
}: Props) {
  const { viewport } = useThree();

  const scale = Math.min(viewport.height * 0.38, viewport.width * 0.46);
  const offsetY = viewport.width > 6 ? viewport.height * 0.07 : 0;

  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(data.voidPositions, 3));
    buffer.setAttribute("aVoid", new THREE.BufferAttribute(data.voidPositions, 3));
    buffer.setAttribute("aTarget", new THREE.BufferAttribute(data.targetPositions, 3));
    buffer.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 3));
    buffer.setAttribute("aLum", new THREE.BufferAttribute(data.luminance, 1));
    buffer.setAttribute("aColor", new THREE.BufferAttribute(data.colors, 3));
    buffer.setAttribute("aFeature", new THREE.BufferAttribute(data.features, 1));
    buffer.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return buffer;
  }, [data]);

  const lineGeometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(CONNECTIONS.length * 6), 3)
    );
    buffer.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return buffer;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uReveal: { value: 0 },
      uDisruption: { value: 0 },
      uSwirl: { value: 0 },
      uNetwork: { value: 0 },
      uEnergy: { value: 0 },
      uHighlight: { value: 0 },
      uExit: { value: 0 },
      uBreath: { value: 0 },
      uColorRestore: { value: 0 },
      uProjectNodes: { value: PROJECT_INDICES.map(() => new THREE.Vector3(20, 20, 0)) },
      uMouseStrength: { value: 0.25 },
      uAttract: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 22 },
      uMouse: { value: new THREE.Vector3(20, 20, 0) },
    }),
    []
  );

  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const projected = useMemo(() => new THREE.Vector3(), []);

  useEffect(
    () => () => {
      geometry.dispose();
      lineGeometry.dispose();
    },
    [geometry, lineGeometry]
  );

  useFrame((state, delta) => {
    const step = Math.min(1, delta * 3.5);
    const current = stateRef.current;
    const time = state.clock.elapsedTime;

    uniforms.uTime.value = time;
    uniforms.uProgress.value += (current.progress - uniforms.uProgress.value) * step;
    uniforms.uDisruption.value += (current.disruption - uniforms.uDisruption.value) * step;
    uniforms.uSwirl.value += (current.swirl - uniforms.uSwirl.value) * step;
    uniforms.uNetwork.value += (current.network - uniforms.uNetwork.value) * step;
    uniforms.uEnergy.value += (current.energy - uniforms.uEnergy.value) * step;
    uniforms.uHighlight.value += (current.highlight - uniforms.uHighlight.value) * step;
    uniforms.uExit.value += (current.exit - uniforms.uExit.value) * step;
    uniforms.uBreath.value += (current.breath - uniforms.uBreath.value) * step;
    uniforms.uColorRestore.value += (current.colorRestore - uniforms.uColorRestore.value) * step;
    uniforms.uReveal.value = Math.min(1, uniforms.uReveal.value + delta * 0.55);
    uniforms.uMouseStrength.value +=
      (0.25 + current.mouseStrength * 0.75 - uniforms.uMouseStrength.value) * step;
    uniforms.uAttract.value += ((current.attract ? 1 : 0) - uniforms.uAttract.value) * step * 2;
    uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    const mouseX = (current.pointer.x * viewport.width * 0.5) / scale;
    const mouseY = (current.pointer.y * viewport.height * 0.5 - offsetY) / scale;
    uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * Math.min(1, delta * 5);
    uniforms.uMouse.value.y += (mouseY - uniforms.uMouse.value.y) * Math.min(1, delta * 5);

    if (uniforms.uNetwork.value > 0.001) {
      const linePositions = lineGeometry.attributes.position.array as Float32Array;
      const isPinned = (index: number) => (PROJECT_INDICES as readonly number[]).includes(index);
      for (let i = 0; i < CONNECTIONS.length; i++) {
        const [from, to] = CONNECTIONS[i];
        const a = nodeScreenPosition(
          from,
          time,
          current.energy,
          uniforms.uNetwork.value,
          uniforms.uExit.value,
          uniforms.uMouse.value.x,
          uniforms.uMouse.value.y,
          uniforms.uMouseStrength.value,
          isPinned(from)
        );
        const b = nodeScreenPosition(
          to,
          time,
          current.energy,
          uniforms.uNetwork.value,
          uniforms.uExit.value,
          uniforms.uMouse.value.x,
          uniforms.uMouse.value.y,
          uniforms.uMouseStrength.value,
          isPinned(to)
        );
        const offset = i * 6;
        linePositions[offset] = a[0];
        linePositions[offset + 1] = a[1];
        linePositions[offset + 2] = a[2];
        linePositions[offset + 3] = b[0];
        linePositions[offset + 4] = b[1];
        linePositions[offset + 5] = b[2];
      }
      lineGeometry.attributes.position.needsUpdate = true;
    }
    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity =
        uniforms.uNetwork.value *
        (0.1 + uniforms.uEnergy.value * 0.06) *
        (1 - uniforms.uHighlight.value * 0.35) *
        (1 - uniforms.uExit.value * 0.6) *
        current.link;
    }

    const { width, height } = state.size;
    const nodesVisible = uniforms.uHighlight.value > 0.001;
    const nodePositions = nodesVisible
      ? PROJECT_INDICES.map((index, i) => {
          const local = nodeScreenPosition(
            index,
            time,
            current.energy,
            uniforms.uNetwork.value,
            uniforms.uExit.value,
            uniforms.uMouse.value.x,
            uniforms.uMouse.value.y,
            uniforms.uMouseStrength.value,
            true
          );
          uniforms.uProjectNodes.value[i].set(local[0], local[1], local[2]);
          projected.set(local[0] * scale, local[1] * scale + offsetY, local[2] * scale);
          projected.project(state.camera);
          const normalizedX = projected.x * 0.5 + 0.5;
          return {
            x: normalizedX * width,
            y: (-projected.y * 0.5 + 0.5) * height,
            side: normalizedX > 0.56 ? "left" : "right",
          } as const;
        })
      : [];

    for (let i = 0; i < PROJECT_INDICES.length; i++) {
      const button = projectNodeRefs.current[i];
      const visibility = nodesVisible
        ? uniforms.uHighlight.value * (1 - uniforms.uExit.value * 0.8)
        : 0;
      if (!button) continue;

      const interactive = visibility > 0.6;
      button.style.opacity = String(visibility);
      button.style.pointerEvents = interactive ? "auto" : "none";
      button.tabIndex = interactive ? 0 : -1;
      button.setAttribute("aria-hidden", interactive ? "false" : "true");
      button.dataset.selected = current.projectFocus === i ? "true" : "false";

      if (!nodesVisible) continue;

      const position = nodePositions[i];
      const nearby = nodePositions.filter(
        (other, j) =>
          j !== i && other.side === position.side && Math.abs(other.y - position.y) < 44
      ).length;
      const above = nodePositions.filter(
        (other, j) => j !== i && other.side === position.side && other.y < position.y
      ).length;
      const shift = nearby ? (above % 2 === 0 ? -14 : 14) : 0;

      button.dataset.side = position.side;
      button.style.setProperty("--label-shift", `${shift}px`);
      button.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
    }

    if (!reducedMotion) {
      state.camera.position.x += (current.pointer.x * 0.09 - state.camera.position.x) * step * 0.4;
      state.camera.position.y += (current.pointer.y * 0.09 - state.camera.position.y) * step * 0.4;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <points geometry={geometry} position={[0, offsetY, 0]} scale={scale} frustumCulled={false}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments
        geometry={lineGeometry}
        position={[0, offsetY, 0]}
        scale={scale}
        frustumCulled={false}
      >
        <lineBasicMaterial
          ref={lineMaterialRef}
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}
