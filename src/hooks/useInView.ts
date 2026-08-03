import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element has entered the viewport.
 * SSR-safe and one-shot by default so entrance motion never replays.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  { once = true, rootMargin = "0px 0px -8% 0px" }: { once?: boolean; rootMargin?: string } = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}
