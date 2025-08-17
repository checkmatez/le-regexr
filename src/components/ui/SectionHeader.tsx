import { type ReactNode } from 'react';

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return <h3 className={`text-lg font-semibold text-amber-400 mb-4 ${className}`}>{children}</h3>;
}
