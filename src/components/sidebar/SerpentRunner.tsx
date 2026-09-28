import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'motion/react';
import { createSerpentRunner } from '@/game/serpentRunner';
import { useI18n } from '@/i18n/context';
import s from './SerpentRunner.module.scss';

type Runner = ReturnType<typeof createSerpentRunner>;

/** Contact view mini-game: jump the serpent over runestones. */
export function SerpentRunner({ variants }: { variants?: Variants }) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runnerRef = useRef<Runner | null>(null);

  const labels = {
    start: t('gameStart'),
    over: t('gameOver'),
    retry: t('gameRetry'),
    best: t('gameBest'),
  };
  const labelsRef = useRef(labels);

  useEffect(() => {
    const runner = createSerpentRunner(canvasRef.current!, labelsRef.current);
    runnerRef.current = runner;
    return () => runner.destroy();
  }, []);

  // Keep canvas text in the current language.
  const { start, over, retry, best } = labels;
  useEffect(() => {
    labelsRef.current = { start, over, retry, best };
    runnerRef.current?.setLabels(labelsRef.current);
  }, [start, over, retry, best]);

  return (
    <motion.section className={s.card} aria-label={t('gameLabel')} variants={variants} data-grow>
      <div className={s.stage}>
        <canvas ref={canvasRef} className={s.canvas} tabIndex={0} aria-label={t('gameHelp')} />
      </div>
    </motion.section>
  );
}
