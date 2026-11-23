export type ExperienceState = {
  progress: number;
  disruption: number;
  swirl: number;
  network: number;
  energy: number;
  highlight: number;
  exit: number;
  link: number;
  breath: number;
  colorRestore: number;
  mouseStrength: number;
  pointer: { x: number; y: number };
  attract: boolean;
  projectFocus: number | null;
};

export const createExperienceState = (): ExperienceState => ({
  progress: 0,
  disruption: 0,
  swirl: 0,
  network: 0,
  energy: 0,
  highlight: 0,
  exit: 0,
  link: 1,
  breath: 0,
  colorRestore: 0,
  mouseStrength: 0,
  pointer: { x: 0, y: 0 },
  attract: false,
  projectFocus: null,
});
