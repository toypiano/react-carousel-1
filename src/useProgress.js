import { useState, useEffect } from "react";

let useProgress = (animate, time, currentIndex) => {
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animate) {
      let rafId = null;
      let start = null;
      let step = timestamp => {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        setProgress(progress);
        if (progress < time) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    }
  }, [animate, time, currentIndex]); // need currentIndex as diff list to cleanup/re-init progress.

  return animate ? Math.min(progress / time, time) : 0;
};

export default useProgress;
