import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Copy, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import { useI18n } from '@/i18n/context';
import { useNow } from '@/hooks/useNow';
import { useCopy } from '@/hooks/useCopy';
import { formatClock } from '@/lib/format';
import { BrandIcon, LinkedInIcon } from '../BrandIcon';
import { Serpent } from '../Serpent';
import type { SidebarView } from './TopBar';
import s from './ProfileCard.module.scss';

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.18 },
};

export function ProfileCard({ view }: { view: SidebarView }) {
  const { t, l, locale, setLocale } = useI18n();
  const now = useNow();
  const reduceMotion = useReducedMotion();

  return (
    <section className={s.card} aria-labelledby="profile-name">
      <div className={s.head}>
        <motion.div
          className={s.avatar}
          initial={reduceMotion ? false : { rotate: -140, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Serpent glowingEye className={s.avatarArt} />
        </motion.div>

        <div className={s.lang} role="group" aria-label={t('language')}>
          {(['en', 'ka'] as const).map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-pressed={locale === code}
              onClick={() => setLocale(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <time className={s.clock} dateTime={now.toISOString()} title={t('localTime')}>
          <span className="visually-hidden">{t('localTime')}: </span>
          {formatClock(now, profile.timeZone)}
        </time>
      </div>

      <div className={s.identity}>
        <h1 id="profile-name" className={s.name}>
          {l(profile.name)}
        </h1>
        <p className={s.handle}>
          {profile.handle}
          <span className={s.runes} aria-hidden="true">
            {profile.handleRunes}
          </span>
          <span className={s.location}>{l(profile.location)}</span>
        </p>
      </div>

      <div className={s.body}>
        <AnimatePresence mode="wait" initial={false}>
          {view === 'info' ? (
            <motion.p key="info" className={s.bio} {...fade}>
              {l(profile.bio)}
            </motion.p>
          ) : (
            <motion.div key="contact" {...fade}>
              <ContactDetails />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ContactDetails() {
  const { t } = useI18n();
  const { copied, copy } = useCopy();

  return (
    <div className={s.contact}>
      <p className={s.contactLead}>{t('contactLead')}</p>
      <ul className={s.links}>
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            type="button"
            className={s.iconButton}
            onClick={() => copy(profile.email)}
            aria-label={t('copyEmail')}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? t('copied') : ''}
          </span>
        </li>
        <li>
          <LinkedInIcon className={s.linkIcon} />
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <BrandIcon name="siGithub" className={s.linkIcon} />
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/Besika40k
          </a>
        </li>
        <li>
          <BrandIcon name="siDiscord" className={s.linkIcon} />
          <span>@{profile.discord}</span>
        </li>
      </ul>
      <a className={s.cv} href={profile.cv} download>
        <FileDown size={16} aria-hidden="true" />
        {t('downloadCv')}
      </a>
    </div>
  );
}
