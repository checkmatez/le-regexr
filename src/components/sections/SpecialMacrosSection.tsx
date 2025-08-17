import type { SpecialMacrosSectionProps } from '../types/component-props';
import { MacroCheckbox, SectionContainer, SectionHeader } from '../ui';

export function SpecialMacrosSection({
  swapAttributes,
  onSwapAttributesChange,
}: SpecialMacrosSectionProps) {
  return (
    <SectionContainer className="mb-8">
      <SectionHeader>Special</SectionHeader>
      <MacroCheckbox
        checked={swapAttributes.enabled}
        onChange={onSwapAttributesChange}
        label="SwapAttributes"
        description="Items affected by Relic of the Observer"
      />
    </SectionContainer>
  );
}
