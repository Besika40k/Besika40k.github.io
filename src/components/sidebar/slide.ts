import type { Variants } from 'motion/react';

// Card transitions for switching sidebar views, timed like jkane.co:
// each card slides 110% of its width, 300ms, staggered by 0.1s.
const easeIn = [0.22, 0.61, 0.36, 1] as const;
const easeOut = [0.55, 0.06, 0.68, 0.19] as const;

/**
 * @param from -1 slides in from (and out to) the left, 1 from the right
 * @param delay entrance delay in seconds
 * @param delayExit exit delay in seconds
 */
export const slide = (from: -1 | 1, delay: number, delayExit: number): Variants => ({
  initial: { x: `${from * 110}%` },
  animate: { x: 0, transition: { duration: 0.3, delay, ease: easeIn } },
  exit: { x: `${from * 110}%`, transition: { duration: 0.3, delay: delayExit, ease: easeOut } },
});
