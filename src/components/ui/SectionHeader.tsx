import { type ReactNode } from 'react';

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return (
    <h3 className={`text-base md:text-lg font-semibold text-amber-400 mb-3 md:mb-4 ${className}`}>
      {children}
    </h3>
  );
}
