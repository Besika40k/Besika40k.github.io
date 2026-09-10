import { skillGroups } from '@/data/skills';
import { spokenLanguages } from '@/data/education';
import { useI18n } from '@/i18n/context';
import { Section } from './Section';
import s from './SkillsSection.module.scss';

export function SkillsSection() {
  const { t, l } = useI18n();
  return (
    <Section id="skills" title={t('skills')}>
      <dl className={s.groups}>
        {skillGroups.map((group) => (
          <div key={group.id} className={s.group}>
            <dt className={s.label}>{l(group.label)}</dt>
            <dd>
              <ul className={s.chips}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
        <div className={s.group}>
          <dt className={s.label}>{t('spokenLanguages')}</dt>
          <dd>
            <ul className={s.spoken}>
              {spokenLanguages.map((language) => (
                <li key={language.name.en}>
                  <span>{l(language.name)}</span>
                  <span className={s.level}>{l(language.level)}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </Section>
  );
}
