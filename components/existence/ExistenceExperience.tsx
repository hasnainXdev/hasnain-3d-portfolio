"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projects } from "@/app/constants";
import ParticleField from "./ParticleField";
import { PROJECT_INDICES } from "./network";
import { samplePortrait, type ParticleData } from "./samplePortrait";
import { createExperienceState } from "./types";
import styles from "./ExistenceExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "EXISTENCE.EXE";
const GITHUB_URL = "https://github.com/hasnainxdev";
const X_URL = "https://x.com/hasnainxtech";
const CONTACT_URL = "mailto:hasnain.codes0@gmail.com";

export default function ExistenceExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const disruptRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const phaseVoidRef = useRef<HTMLSpanElement>(null);
  const phaseReconRef = useRef<HTMLSpanElement>(null);
  const phaseDisruptRef = useRef<HTMLSpanElement>(null);
  const phaseNetRef = useRef<HTMLSpanElement>(null);
  const phaseHumanRef = useRef<HTMLSpanElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const projectNodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const blurTimer = useRef<number | null>(null);
  const stateRef = useRef(createExperienceState());

  const [data, setData] = useState<ParticleData | null>(null);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [focusedProject, setFocusedProject] = useState<number | null>(null);

  useLayoutEffect(() => {
    document.documentElement.classList.add("existence-boot");
    document.body.classList.add("existence-mode");
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    return () => {
      document.documentElement.classList.remove("existence-boot");
      document.body.classList.remove("existence-mode");
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const width = window.innerWidth;
    const count = width < 768 ? 9000 : width < 1200 ? 16000 : 24000;
    samplePortrait("/personal-pic.png", count).then((result) => {
      if (active) setData(result);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      stateRef.current.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("a, button")) return;
      stateRef.current.attract = true;
    };
    const onUp = () => {
      stateRef.current.attract = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const cancelProjectBlur = () => {
    if (blurTimer.current === null) return;
    window.clearTimeout(blurTimer.current);
    blurTimer.current = null;
  };

  const focusProject = (index: number) => {
    cancelProjectBlur();
    stateRef.current.projectFocus = index;
    setFocusedProject(index);
  };

  const scheduleProjectBlur = () => {
    cancelProjectBlur();
    blurTimer.current = window.setTimeout(() => {
      blurTimer.current = null;
      stateRef.current.projectFocus = null;
      setFocusedProject(null);
    }, 140);
  };

  useEffect(
    () => () => {
      if (blurTimer.current !== null) window.clearTimeout(blurTimer.current);
    },
    []
  );

  const activeProject = focusedProject !== null ? projects[focusedProject] : null;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const identityLinks = identityRef.current
      ? Array.from(identityRef.current.querySelectorAll("a"))
      : [];
    const setIdentityInteractive = (active: boolean) => {
      if (identityRef.current) {
        identityRef.current.style.pointerEvents = active ? "auto" : "none";
        identityRef.current.setAttribute("aria-hidden", active ? "false" : "true");
      }
      identityLinks.forEach((link) => {
        link.tabIndex = active ? 0 : -1;
      });
    };
    setIdentityInteractive(false);

    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!reduced) {
      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      if (reduced) {
        stateRef.current.progress = 1;
        stateRef.current.breath = 0.5;
        stateRef.current.colorRestore = 1;
        gsap.set(root.querySelectorAll(`.${styles.char}, .${styles.bootLine}, .${styles.introLine}`), {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        gsap.set(
          [
            voidRef.current,
            hintRef.current,
            phaseVoidRef.current,
            phaseReconRef.current,
            phaseDisruptRef.current,
            phaseNetRef.current,
            introRef.current,
            disruptRef.current,
            networkRef.current,
          ],
          { opacity: 0 }
        );
        gsap.set([phaseHumanRef.current, identityRef.current, linksRef.current], {
          opacity: 1,
          y: 0,
        });
        setIdentityInteractive(true);
        gsap.set(fillRef.current, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        root.querySelectorAll(`.${styles.char}`),
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.035, ease: "power4.out", delay: 0.15 }
      );
      gsap.fromTo(
        root.querySelectorAll(`.${styles.bootLine}`),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power2.out", delay: 0.5 }
      );

      const proxy = {
        progress: 0,
        mouse: 0,
        disruption: 0,
        swirl: 0,
        network: 0,
        energy: 0,
        highlight: 0,
        exit: 0,
        link: 1,
        breath: 0,
        colorRestore: 0,
        identity: 0,
      };
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=1400%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress >= 0.4 && self.progress <= 0.72) return;
            if (stateRef.current.projectFocus === null) return;
            if (blurTimer.current !== null) window.clearTimeout(blurTimer.current);
            blurTimer.current = null;
            stateRef.current.projectFocus = null;
            setFocusedProject(null);
          },
        },
      });

      timeline.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, duration: 14 }, 0);
      timeline.to(hintRef.current, { opacity: 0, duration: 0.25 }, 0.3);
      timeline.to(voidRef.current, { opacity: 0, y: -32, duration: 0.45 }, 0.42);
      timeline.to(
        proxy,
        {
          progress: 1,
          duration: 1.6,
          onUpdate: () => {
            stateRef.current.progress = proxy.progress;
          },
        },
        0.45
      );
      timeline.fromTo(
        root.querySelectorAll(`.${styles.introLine}`),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.2 },
        0.95
      );
      timeline.to(phaseVoidRef.current, { opacity: 0, duration: 0.18 }, 0.45);
      timeline.to(phaseReconRef.current, { opacity: 1, duration: 0.18 }, 0.75);
      timeline.to(phaseReconRef.current, { opacity: 0, duration: 0.18 }, 2.1);
      timeline.to(phaseDisruptRef.current, { opacity: 1, duration: 0.18 }, 2.3);
      timeline.to(introRef.current, { opacity: 0.32, duration: 0.4 }, 2.25);
      timeline.fromTo(
        disruptRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4 },
        2.25
      );
      timeline.to(
        proxy,
        {
          mouse: 1,
          duration: 0.9,
          onUpdate: () => {
            stateRef.current.mouseStrength = proxy.mouse;
          },
        },
        2.1
      );

      timeline.to(
        proxy,
        {
          disruption: 1,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.disruption = proxy.disruption;
          },
        },
        3
      );
      timeline.to(
        proxy,
        {
          swirl: 1,
          duration: 3,
          onUpdate: () => {
            stateRef.current.swirl = proxy.swirl;
          },
        },
        3
      );
      timeline.to(
        proxy,
        {
          disruption: 0,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.disruption = proxy.disruption;
          },
        },
        5
      );

      timeline.to(phaseDisruptRef.current, { opacity: 0, duration: 0.2 }, 6.1);
      timeline.to(phaseNetRef.current, { opacity: 1, duration: 0.2 }, 6.1);
      timeline.to(introRef.current, { opacity: 0, duration: 0.25 }, 6.2);
      timeline.to(disruptRef.current, { opacity: 0, y: -12, duration: 0.3 }, 6.2);
      timeline.fromTo(
        networkRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45 },
        6.7
      );

      timeline.to(
        proxy,
        {
          network: 1,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.network = proxy.network;
          },
        },
        6
      );
      timeline.to(
        proxy,
        {
          energy: 1,
          duration: 1.2,
          onUpdate: () => {
            stateRef.current.energy = proxy.energy;
          },
        },
        7.2
      );
      timeline.to(
        proxy,
        {
          highlight: 1,
          duration: 0.6,
          onUpdate: () => {
            stateRef.current.highlight = proxy.highlight;
            if (proxy.highlight < 0.4 && stateRef.current.projectFocus !== null) {
              stateRef.current.projectFocus = null;
              setFocusedProject(null);
            }
          },
        },
        8.3
      );
      timeline.to(
        proxy,
        {
          exit: 1,
          duration: 0.7,
          onUpdate: () => {
            stateRef.current.exit = proxy.exit;
          },
        },
        9.3
      );
      timeline.to(networkRef.current, { opacity: 0, y: -10, duration: 0.4 }, 9.4);
      timeline.to(phaseNetRef.current, { opacity: 0, duration: 0.3 }, 9.5);

      timeline.to(phaseHumanRef.current, { opacity: 1, duration: 0.2 }, 10.2);
      timeline.to(
        proxy,
        {
          link: 0,
          duration: 0.8,
          onUpdate: () => {
            stateRef.current.link = proxy.link;
          },
        },
        10
      );
      timeline.to(
        proxy,
        {
          highlight: 0,
          duration: 0.4,
          onUpdate: () => {
            stateRef.current.highlight = proxy.highlight;
            if (proxy.highlight < 0.4 && stateRef.current.projectFocus !== null) {
              stateRef.current.projectFocus = null;
              setFocusedProject(null);
            }
          },
        },
        10
      );
      timeline.to(
        proxy,
        {
          exit: 0,
          duration: 1.1,
          onUpdate: () => {
            stateRef.current.exit = proxy.exit;
          },
        },
        10.2
      );
      timeline.to(
        proxy,
        {
          energy: 0,
          duration: 1.4,
          onUpdate: () => {
            stateRef.current.energy = proxy.energy;
          },
        },
        10.2
      );
      timeline.to(
        proxy,
        {
          network: 0,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.network = proxy.network;
          },
        },
         10.4
      );
      timeline.to(
        proxy,
        {
          colorRestore: 1,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.colorRestore = proxy.colorRestore;
          },
        },
        10.4
      );
      timeline.to(
        proxy,
        {
          mouse: 0.25,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            stateRef.current.mouseStrength = proxy.mouse;
          },
        },
        10.4
      );
      timeline.to(
        proxy,
        {
          breath: 1,
          duration: 0.8,
          onUpdate: () => {
            stateRef.current.breath = proxy.breath;
          },
        },
        12.2
      );
      timeline.to(
        proxy,
        {
          identity: 1,
          duration: 0.8,
          onUpdate: () => {
            setIdentityInteractive(proxy.identity > 0.6);
          },
        },
        12.2
      );
      timeline.fromTo(
        identityRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        12.2
      );
      timeline.fromTo(
        linksRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        12.8
      );
    }, root);

    return () => {
      context.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced]);

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.canvas}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 100 }}
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          >
            <color attach="background" args={["#050506"]} />
            {data && (
              <ParticleField
                data={data}
                stateRef={stateRef}
                reducedMotion={reduced}
                projectNodeRefs={projectNodeRefs}
              />
            )}
          </Canvas>
        </div>

        <div className={styles.vignette} aria-hidden />
        <div className={styles.grain} aria-hidden />

        <div className={styles.overlay} data-project-focus={activeProject ? "true" : "false"}>
          <div className={styles.topRow}>
            <span className={`${styles.micro} ${styles.bootLine}`}>
              EXISTENCE<span className={styles.dim}>.EXE</span>
            </span>
            <div className={styles.phaseStack}>
              <span ref={phaseVoidRef} className={`${styles.phaseLabel} ${styles.phaseActive}`}>
                01 / VOID
              </span>
              <span ref={phaseReconRef} className={styles.phaseLabel}>
                02 / RECONSTRUCTION
              </span>
              <span ref={phaseDisruptRef} className={styles.phaseLabel}>
                03 / DISRUPTION
              </span>
              <span ref={phaseNetRef} className={styles.phaseLabel}>
                04 / INTELLIGENCE
              </span>
              <span ref={phaseHumanRef} className={styles.phaseLabel}>
                05 / EXISTENCE
              </span>
            </div>
          </div>

          <div ref={voidRef} className={`${styles.phaseBlock} ${styles.voidBlock}`}>
            <p className={`${styles.eyebrow} ${styles.bootLine}`}>SYSTEM BOOT — SUBJECT UNKNOWN</p>
            <h1 className={styles.title} aria-label={TITLE}>
              {TITLE.split("").map((character, index) => (
                <span key={index} className={styles.charMask} aria-hidden>
                  <span className={styles.char}>{character}</span>
                </span>
              ))}
            </h1>
          </div>

          <div ref={introRef} className={`${styles.phaseBlock} ${styles.introBlock}`}>
            <p className={styles.introLine}>I AM NOT A PROFILE.</p>
            <p className={styles.introLine}>I AM A RECONSTRUCTION.</p>
          </div>

          <div ref={disruptRef} className={`${styles.phaseBlock} ${styles.disruptBlock}`}>
            <p className={styles.introLine}>MOVE TO DISRUPT · HOLD TO ATTRACT</p>
          </div>

          <div ref={networkRef} className={`${styles.phaseBlock} ${styles.networkBlock}`}>
            <p className={styles.networkIntro}>
              SELECTED ENGINEERING PROJECTS — Explore the systems I&apos;ve built.
            </p>
            <p className={styles.networkHint}>HOVER OR FOCUS A NODE TO INSPECT</p>
          </div>

          <div ref={identityRef} className={`${styles.phaseBlock} ${styles.identityBlock}`}>
            <p className={styles.identityEyebrow}>SUBJECT IDENTIFIED</p>
            <h2 className={styles.identityName}>MUHAMMAD HASNAIN</h2>
            <p className={styles.identityCopy}>
              I build backend systems and AI tools that turn messy workflows into reliable software.
            </p>
            <p className={styles.identityFocus}>BACKEND SYSTEMS / AI AGENTS / PRODUCT</p>
            <div ref={linksRef} className={styles.identityLinks}>
              <a className={styles.identityLink} href={GITHUB_URL} target="_blank" rel="noreferrer">
                GITHUB
              </a>
              <a className={styles.identityLink} href={X_URL} target="_blank" rel="noreferrer">
                X
              </a>
              <a className={styles.identityLink} href={CONTACT_URL}>
                CONTACT
              </a>
            </div>
          </div>

          <div ref={hintRef} className={styles.scrollHint}>
            <span>SCROLL TO RECONSTRUCT</span>
            <i className={styles.scrollLine} />
          </div>

          {PROJECT_INDICES.map((nodeIndex, index) => (
            <a
              key={nodeIndex}
              ref={(element) => {
                projectNodeRefs.current[index] = element;
              }}
              className={styles.projectNode}
              href={projects[index].github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${projects[index].title} on GitHub`}
              onPointerEnter={() => focusProject(index)}
              onPointerLeave={scheduleProjectBlur}
              onFocus={() => focusProject(index)}
              onBlur={scheduleProjectBlur}
            >
              <span className={styles.projectNodeCore} />
              <span className={styles.projectNodeLabel}>{projects[index].title}</span>
            </a>
          ))}

          <div
            ref={previewRef}
            className={styles.projectPreview}
            aria-live="polite"
            aria-hidden={!activeProject}
            onPointerEnter={cancelProjectBlur}
            onPointerLeave={scheduleProjectBlur}
            onFocus={cancelProjectBlur}
            onBlur={scheduleProjectBlur}
          >
            {activeProject && (
              <>
                <span className={styles.previewEyebrow}>
                  PROJECT FILE / {String((focusedProject ?? 0) + 1).padStart(2, "0")}
                </span>
                <strong className={styles.previewTitle}>{activeProject.title}</strong>
                <div className={styles.previewSection}>
                  <span className={styles.previewLabel}>PROBLEM SOLVED</span>
                  <p className={styles.previewPurpose}>{activeProject.description}</p>
                </div>
                <div className={styles.previewSection}>
                  <span className={styles.previewLabel}>MY CONTRIBUTION</span>
                  <ul className={styles.previewList}>
                    {activeProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.previewSection}>
                  <span className={styles.previewLabel}>TECHNOLOGY STACK</span>
                  <span className={styles.previewTech}>{activeProject.tech.join(" / ")}</span>
                </div>
                <div className={styles.previewActions}>
                  <a
                    className={styles.previewLink}
                    tabIndex={activeProject ? 0 : -1}
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GITHUB ↗
                  </a>
                  {activeProject.live && (
                    <a
                      className={styles.previewLink}
                      tabIndex={activeProject ? 0 : -1}
                      href={activeProject.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LIVE DEMO ↗
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.bottomRow}>
            <div className={styles.progressTrack}>
              <div ref={fillRef} className={styles.progressFill} />
            </div>
          </div>

          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden />
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden />
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden />
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden />
        </div>
      </div>
    </div>
  );
}
