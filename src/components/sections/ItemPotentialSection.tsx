import { ITEM_POTENTIAL_MACROS, OPERATOR_OPTIONS } from '../../data/stash-macros';
import type { MacroWithValue } from '../../types/stash-search';
import type { ItemPotentialSectionProps } from '../types/component-props';
import { MacroCheckbox, MacroInputWithOperator, SectionContainer, SectionHeader } from '../ui';

export function ItemPotentialSection({
  itemPotential,
  updateMacroWithValue,
}: ItemPotentialSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Item Potential</SectionHeader>
      <div className="space-y-4">
        {Object.entries(ITEM_POTENTIAL_MACROS).map(([key, macro]) => (
          <div key={key} className="space-y-2">
            <MacroCheckbox
              checked={itemPotential[key as keyof typeof itemPotential].enabled}
              onChange={(checked) => updateMacroWithValue('itemPotential', key, 'enabled', checked)}
              label={macro.name}
              description={macro.description}
            />
            {macro.hasValue && itemPotential[key as keyof typeof itemPotential].enabled && (
              <MacroInputWithOperator
                value={(itemPotential[key as keyof typeof itemPotential] as MacroWithValue).value}
                operator={
                  (itemPotential[key as keyof typeof itemPotential] as MacroWithValue).operator
                }
                onValueChange={(value) =>
                  updateMacroWithValue('itemPotential', key, 'value', value)
                }
                onOperatorChange={(operator) =>
                  updateMacroWithValue('itemPotential', key, 'operator', operator)
                }
                operatorOptions={OPERATOR_OPTIONS}
                min={0}
                max={macro.maxValue}
              />
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
