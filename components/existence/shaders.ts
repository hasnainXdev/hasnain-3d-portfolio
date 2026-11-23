import { NODE_COUNT, PROJECT_INDICES, nodePositionGLSL } from "./network";

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uReveal;
  uniform float uDisruption;
  uniform float uSwirl;
  uniform float uNetwork;
  uniform float uEnergy;
  uniform float uHighlight;
  uniform float uExit;
  uniform float uBreath;
  uniform vec3 uProjectNodes[${PROJECT_INDICES.length}];
  uniform float uMouseStrength;
  uniform float uAttract;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uMouse;

  attribute vec3 aVoid;
  attribute vec3 aTarget;
  attribute vec3 aSeed;
  attribute float aLum;
  attribute vec3 aColor;
  attribute float aFeature;

  varying float vAlpha;
  varying float vLum;
  varying float vDistort;
  varying float vHighlight;
  varying float vFeature;
  varying vec3 vColor;

  const float PI = 3.14159265359;

  ${nodePositionGLSL}

  void main() {
    vHighlight = 0.0;
    float delay = aSeed.x * 0.34;
    float t = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 p = mix(aVoid, aTarget, t);

    vec3 burst = vec3(0.0);
    if (uDisruption > 0.0) {
      float spin = uSwirl * uDisruption;
      float azimuth = aSeed.x * PI * 2.0;
      float elevation = (aSeed.y - 0.5) * PI;
      vec3 direction = vec3(cos(elevation) * cos(azimuth), sin(elevation), cos(elevation) * sin(azimuth));
      vec2 radial = normalize(aTarget.xy + vec2(0.0001));
      burst = mix(direction, vec3(radial, direction.z * 0.6), 0.5);
      burst *= 0.3 + aSeed.z * 0.85;

      float burstAngle = spin * (1.2 + aSeed.z * 1.6);
      float bc = cos(burstAngle);
      float bs = sin(burstAngle);
      burst.xy = mat2(bc, -bs, bs, bc) * burst.xy;
      p += burst * uDisruption;

      float fieldAngle = spin * 0.35;
      float fc = cos(fieldAngle);
      float fs = sin(fieldAngle);
      p.xy = mat2(fc, -fs, fs, fc) * p.xy;
    }

    if (uNetwork > 0.0) {
      float nodeIndex = floor(aSeed.x * ${NODE_COUNT.toFixed(1)});
      vec3 node = nodePosition(nodeIndex, uTime, uEnergy);
      vec3 local = vec3(aSeed.y - 0.5, aSeed.z - 0.5, sin(aSeed.y * 31.0)) * 0.22;
      vec3 networkPoint = node + local;

      float linkTest = fract(aSeed.y * 17.0 + aSeed.z * 7.0);
      if (linkTest < 0.34) {
        float otherIndex = mod(nodeIndex + 1.0 + floor(aSeed.z * 3.0), ${NODE_COUNT.toFixed(1)});
        vec3 other = nodePosition(otherIndex, uTime, uEnergy);
        networkPoint = mix(node, other, fract(aSeed.x * 43.0 + aSeed.y * 11.0));
        networkPoint += normalize(vec3(aSeed.y - 0.5, aSeed.z - 0.5, 0.15)) * 0.035;
      }

      p = mix(p, networkPoint, uNetwork);

      vec3 outward = normalize(p + vec3(0.0001));
      float pulse = sin(uTime * 1.1 + nodeIndex * 0.9) * 0.5 + 0.5;
      p += outward * pulse * 0.06 * uEnergy * uNetwork;
      p += outward * uExit * 0.55;

      float nearest = 10.0;
      for (int i = 0; i < ${PROJECT_INDICES.length}; i++) {
        nearest = min(nearest, distance(p, uProjectNodes[i]));
      }
      vHighlight = (1.0 - smoothstep(0.0, 0.32, nearest)) * uHighlight;
    }

    float arc = sin(t * PI);
    vec3 scatter = normalize(aSeed - 0.5 + 0.0001);
    p += scatter * arc * (0.35 + aSeed.z * 0.55);

    float drift = mix(0.13, 0.008, t) * uReveal;
    float time = uTime * 0.32;
    p.x += sin(time + aSeed.y * 23.7) * drift;
    p.y += cos(time * 0.83 + aSeed.z * 18.2) * drift;
    p.z += sin(time * 0.61 + aSeed.x * 29.4) * drift * 1.4;

    if (uBreath > 0.0) {
      vec3 breathAxis = normalize(vec3(aTarget.xy, 0.42) + vec3(0.0001));
      float breath = sin(uTime * 0.85 + aSeed.x * 0.8 + aSeed.y * 0.5) * 0.5 + 0.5;
      p += breathAxis * breath * 0.022 * uBreath;
    }

    vec2 toMouse = p.xy - uMouse.xy;
    float dist = length(toMouse);
    float radius = mix(mix(1.05, 1.55, uNetwork), 2.15, uDisruption);
    float influence = pow(1.0 - smoothstep(0.0, radius, dist), 1.7);
    float force = influence * uMouseStrength * (1.0 + uDisruption * 0.6 + uNetwork * 0.35)
      * (1.0 - vHighlight * 0.9);

    vec2 dir = normalize(toMouse + vec2(0.0001));
    vec2 swirl = vec2(-dir.y, dir.x);
    float pull = mix(1.0, -0.85 - uDisruption * 0.85, uAttract);
    float radialPull = mix(0.62, 0.28, uNetwork);
    float tangentPull = mix(0.34, 0.18, uNetwork);
    p.xy += (dir * pull * radialPull + swirl * (tangentPull + uAttract * uDisruption * 0.6)) * force;
    p.z += force * (0.85 + uDisruption * 1.6) * sin(aSeed.y * PI * 2.0);

    float portraitFeature = aFeature * (1.0 - uNetwork);
    vDistort = force;
    vLum = aLum;
    vColor = aColor;
    vFeature = portraitFeature;
    vAlpha = uReveal * (0.24 + 0.76 * t) * (0.32 + 0.68 * aLum)
      * (1.0 - uDisruption * 0.1 * clamp(abs(burst.z) * 0.4, 0.0, 1.0))
      * (1.0 - uExit * 0.55)
      * (1.0 + portraitFeature * 0.28);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = uSize * (0.5 + 0.8 * aLum)
      * (1.0 + force * 0.85 + uDisruption * 0.25 + vHighlight * 0.9)
      * (1.0 + portraitFeature * 0.18);
    gl_PointSize = clamp(
      size * uPixelRatio / max(0.35, -mvPosition.z),
      0.6,
      11.0 * uPixelRatio
    );
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform float uColorRestore;
  uniform float uNetwork;

  varying float vAlpha;
  varying float vLum;
  varying float vDistort;
  varying float vHighlight;
  varying float vFeature;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float falloff = 1.0 - smoothstep(0.0, 0.5, d);
    float core = pow(falloff, 3.0);
    float featureGlow = vFeature * uColorRestore;
    float alpha = (falloff * 0.34 + core * 1.0) * vAlpha * (1.0 + vHighlight * 0.6);

    vec3 silver = vec3(0.52, 0.56, 0.64);
    vec3 white = vec3(0.96, 0.97, 1.0);
    float tone = clamp(vLum * 0.85 + vDistort * 0.5 + uProgress * 0.1 + vHighlight * 0.7, 0.0, 1.0);
    vec3 monochrome = mix(silver, white, tone);

    vec3 sourceColor = clamp(vColor, 0.0, 1.0);
    float sourceLuma = dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));
    vec3 grayscale = mix(monochrome, vec3(sourceLuma), uColorRestore);
    vec3 color = mix(grayscale, sourceColor, uColorRestore);
    float focusDim = uNetwork * (1.0 - vHighlight * 0.85);
    color *= mix(1.0, 0.58, focusDim);
    color *= mix(1.0, 1.1, featureGlow);
    alpha *= mix(1.0, 0.7, focusDim);
    alpha *= mix(1.0, 0.82, uColorRestore);
    alpha *= mix(1.0, 1.14, featureGlow);

    gl_FragColor = vec4(color, alpha);
  }
`;
