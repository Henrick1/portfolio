import { lazy, Suspense } from "react";
import useInView from "../../hooks/useInView";
import SceneBoundary from "./SceneBoundary";

// three.js is split out of the main bundle so the page text paints first.
const Laptop = lazy(() => import("./Laptop"));
const Earth = lazy(() => import("./Earth"));
const Stars = lazy(() => import("./Stars"));
const SkillBalls = lazy(() => import("./SkillBalls"));
const ServiceIcons = lazy(() => import("./ServiceIcons"));

// Renders the scene only once its container scrolls near the viewport.
const deferred = (Scene, className) =>
  function DeferredCanvas(props) {
    const [ref, inView] = useInView();
    return (
      <div ref={ref} className={className}>
        {inView && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene {...props} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
    );
  };

const HeroCanvas = () => (
  <SceneBoundary>
    <Suspense fallback={null}>
      <Laptop />
    </Suspense>
  </SceneBoundary>
);

const EarthCanvas = deferred(Earth, "w-full h-full");
const StarsCanvas = deferred(Stars, "w-full h-auto absolute inset-0 z-[-1]");

// One shared canvas for every skill ball; only mounted while the Skills
// section is on screen, so it costs nothing elsewhere on the page.
const SkillBallsCanvas = ({ items, active }) =>
  active ? (
    <SceneBoundary>
      <Suspense fallback={null}>
        <SkillBalls items={items} />
      </Suspense>
    </SceneBoundary>
  ) : null;

// Same idea for the 3D icons on the "about me" cards.
const ServiceIconsCanvas = ({ items, active }) =>
  active ? (
    <SceneBoundary>
      <Suspense fallback={null}>
        <ServiceIcons items={items} />
      </Suspense>
    </SceneBoundary>
  ) : null;

export { EarthCanvas, HeroCanvas, StarsCanvas, SkillBallsCanvas, ServiceIconsCanvas };
