import { lazy, Suspense } from "react";
import useInView from "../../hooks/useInView";

// three.js + models are only downloaded when the section scrolls near view.
const EarthScene = lazy(() => import("./Earth"));
const StarsScene = lazy(() => import("./Stars"));

const deferred = (Scene, className) =>
  function DeferredCanvas() {
    const [ref, inView] = useInView();
    return (
      <div ref={ref} className={className}>
        {inView && (
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        )}
      </div>
    );
  };

const EarthCanvas = deferred(EarthScene, "w-full h-full");
const StarsCanvas = deferred(StarsScene, "absolute inset-0 z-[-1]");

export { EarthCanvas, StarsCanvas };
