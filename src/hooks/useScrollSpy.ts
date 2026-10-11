import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which section is current inside `root` (or the window when root is null):
 * the last section whose top has passed the upper third of the view, or the final
 * section once the scroller reaches the bottom.
 */
export function useScrollSpy(ids: string[], root: HTMLElement | null, enabled = true) {
  const [active, setActive] = useState(ids[0]);
  const activeRef = useRef(active);

  useEffect(() => {
    if (!enabled) return;
    const target: HTMLElement | Window = root ?? window;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewTop = root ? root.getBoundingClientRect().top : 0;
      const viewHeight = root ? root.clientHeight : window.innerHeight;
      const scroller = root ?? document.scrollingElement!;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;

      let current = ids[0];
      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top - viewTop <= viewHeight / 3) current = id;
        }
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
      }
    };

    // Scroll events can fire several times per frame; measure once per frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    target.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids, root, enabled]);

  return active;
}
