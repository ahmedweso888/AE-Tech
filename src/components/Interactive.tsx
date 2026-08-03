import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { SplineSceneBasic } from "./spline-demo";

/** Interactive — 3D scene showcase, kept as an intentional dark accent panel. */
export function Interactive() {
  return (
    <Section
      id="interactive"
      eyebrow="Playground"
      title="Interactive engineering"
      lead="Experiments with real-time 3D, motion and GPU-accelerated interfaces on the web."
    >
      <Reveal>
        <div className="overflow-hidden rounded-[26px] shadow-float">
          <SplineSceneBasic />
        </div>
      </Reveal>
    </Section>
  );
}
