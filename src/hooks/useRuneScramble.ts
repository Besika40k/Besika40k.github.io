import { useCallback, useState } from 'react';

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
const randomRune = () => RUNES[Math.floor(Math.random() * RUNES.length)];

/**
 * jkane.co's hover effect with runes: while hovered, up to two letters of `text`
 * (30% of its length, rounded down) are swapped for random Elder Futhark runes.
 */
export function useRuneScramble(text: string) {
  const [scrambled, setScrambled] = useState<{ source: string; value: string } | null>(null);

  const onMouseEnter = useCallback(() => {
    const chars = [...text];
    const letters = chars.flatMap((char, i) => (char.trim() ? [i] : []));
    const count = Math.min(Math.floor(chars.length * 0.3), 2, letters.length);
    const picked = new Set<number>();
    while (picked.size < count) picked.add(letters[Math.floor(Math.random() * letters.length)]);
    for (const i of picked) chars[i] = randomRune();
    setScrambled({ source: text, value: chars.join('') });
  }, [text]);

  const onMouseLeave = useCallback(() => setScrambled(null), []);

  // Ignore a scramble made for a previous label (e.g. after switching language).
  const label = scrambled?.source === text ? scrambled.value : text;
  return { label, hoverProps: { onMouseEnter, onMouseLeave } };
}
