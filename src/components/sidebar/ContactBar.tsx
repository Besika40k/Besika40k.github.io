import { Check, Copy, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import { useI18n } from '@/i18n/context';
import { useCopy } from '@/hooks/useCopy';
import { BrandIcon, LinkedInIcon } from '../BrandIcon';
import s from './ContactBar.module.scss';

export function ContactBar() {
  const { t } = useI18n();
  const { copied, copy } = useCopy();

  return (
    <div className={s.bar}>
      <button
        type="button"
        className={s.email}
        onClick={() => copy(profile.email)}
        aria-label={`${t('copyEmail')}: ${profile.email}`}
      >
        <span className={s.address}>{copied ? t('copied') : profile.email}</span>
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      </button>
      <span className="visually-hidden" aria-live="polite">
        {copied ? t('copied') : ''}
      </span>

      <div className={s.links}>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <BrandIcon name="siGithub" className={s.icon} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon className={s.icon} />
        </a>
        <a href={profile.cv} download aria-label={t('downloadCv')}>
          <FileDown className={s.icon} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
