import { type ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>{children}</div>;
}
