import { useEffect, useState } from 'react';

/**
 * Tracks which section is current inside `root` (or the window when root is null):
 * the last section whose top has passed the upper third of the view, or the final
 * section once the scroller reaches the bottom.
 */
export function useScrollSpy(ids: string[], root: HTMLElement | null, enabled = true) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return;
    const target: HTMLElement | Window = root ?? window;

    // Only a handful of sections, so measuring on every scroll event is cheap.
    const update = () => {
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
      setActive(current);
    };

    update();
    target.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      target.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids, root, enabled]);

  return active;
}
