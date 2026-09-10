import { brandIcons, type BrandIconName } from '@/lib/brandIcons';

interface BrandIconProps {
  name: BrandIconName;
  className?: string;
  /** Accessible label; omit for decorative use. */
  label?: string;
}

export function BrandIcon({ name, className, label }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={brandIcons[name].path} />
    </svg>
  );
}

/** LinkedIn isn't in simple-icons or lucide, so a plain "in" mark. */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="5.2" cy="5.2" r="2.4" />
      <rect x="3.1" y="9" width="4.2" height="12" rx="0.6" />
      <path d="M9.6 9h4v1.8c.7-1.2 2.1-2.1 4-2.1 3 0 4.3 1.9 4.3 5.2V21h-4.2v-6.4c0-1.6-.6-2.5-1.9-2.5-1.4 0-2.1 1-2.1 2.5V21H9.6z" />
    </svg>
  );
}
