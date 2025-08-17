import { ITEM_TYPES } from '../../data/stash-macros';
import type { ItemTypesSectionProps } from '../types/component-props';
import { MacroCheckbox, SectionContainer, SectionHeader } from '../ui';

export function ItemTypesSection({ itemTypes, toggleSetItem }: ItemTypesSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Item Types</SectionHeader>
      <div className="space-y-2">
        {ITEM_TYPES.map((type) => (
          <div key={type.value} className="space-y-1">
            <MacroCheckbox
              checked={itemTypes.has(type.value)}
              onChange={() => toggleSetItem('itemTypes', type.value)}
              label={type.label}
              description={type.description}
            />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
