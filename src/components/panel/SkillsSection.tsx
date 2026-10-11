import { skillGroups } from '@/data/skills';
import { spokenLanguages } from '@/data/education';
import { useI18n } from '@/i18n/context';
import { Section } from './Section';
import s from './SkillsSection.module.scss';

export function SkillsSection() {
  const { t, l } = useI18n();
  const tiles = [
    ...skillGroups.map((group) => ({ id: group.id, label: l(group.label), items: group.items })),
    {
      id: 'spoken',
      label: t('spokenLanguages'),
      items: spokenLanguages.map((lang) => l(lang.name) + ' ' + l(lang.level)),
    },
  ];

  return (
    <Section id="skills" title={t('skills')}>
      <ul className={s.tiles}>
        {tiles.map((tile) => (
          <li key={tile.id} className={s.tile}>
            <h3 className={s.label}>{tile.label}</h3>
            <ul className={s.items}>
              {tile.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
