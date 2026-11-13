import { useEffect, useState } from "react";

// True while the element is on (or near) the screen; used to mount the shared
// 3D canvases only while their section is visible.
const useOnScreen = (ref, rootMargin = "200px") => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return on;
};

export default useOnScreen;
