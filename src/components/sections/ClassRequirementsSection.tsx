import { CLASS_REQUIREMENTS } from '../../data/stash-macros';
import type { ClassRequirementsSectionProps } from '../types/component-props';
import { MacroCheckbox, SectionContainer, SectionHeader } from '../ui';

export function ClassRequirementsSection({
  classRequirements,
  toggleSetItem,
}: ClassRequirementsSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Class Requirements</SectionHeader>
      <div className="space-y-2">
        {CLASS_REQUIREMENTS.map((cls) => (
          <MacroCheckbox
            key={cls.value}
            checked={classRequirements.has(cls.value)}
            onChange={() => toggleSetItem('classRequirements', cls.value)}
            label={cls.label}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
