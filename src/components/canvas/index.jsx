import { lazy, Suspense } from "react";
import useInView from "../../hooks/useInView";
import SceneBoundary from "./SceneBoundary";

// three.js is split out of the main bundle so the page text paints first.
const Computers = lazy(() => import("./Computers"));
const Earth = lazy(() => import("./Earth"));
const Ball = lazy(() => import("./Ball"));
const Stars = lazy(() => import("./Stars"));

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

const ComputersCanvas = () => (
  <SceneBoundary>
    <Suspense fallback={null}>
      <Computers />
    </Suspense>
  </SceneBoundary>
);

const EarthCanvas = deferred(Earth, "w-full h-full");
const BallCanvas = deferred(Ball, "w-full h-full");
const StarsCanvas = deferred(Stars, "w-full h-auto absolute inset-0 z-[-1]");

export { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas };
