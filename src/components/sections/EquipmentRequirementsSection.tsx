import { EQUIPMENT_MACROS, OPERATOR_OPTIONS } from '../../data/stash-macros';
import type { MacroWithValue } from '../../types/stash-search';
import type { EquipmentRequirementsSectionProps } from '../types/component-props';
import { MacroCheckbox, MacroInputWithOperator, SectionContainer, SectionHeader } from '../ui';

export function EquipmentRequirementsSection({
  equipmentRequirements,
  updateMacroWithValue,
}: EquipmentRequirementsSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Equipment Requirements</SectionHeader>
      <div className="space-y-4">
        {Object.entries(EQUIPMENT_MACROS).map(([key, macro]) => (
          <div key={key} className="space-y-2">
            <MacroCheckbox
              checked={equipmentRequirements[key as keyof typeof equipmentRequirements].enabled}
              onChange={(checked) =>
                updateMacroWithValue('equipmentRequirements', key, 'enabled', checked)
              }
              label={macro.name}
              description={macro.description}
            />
            {macro.hasValue &&
              equipmentRequirements[key as keyof typeof equipmentRequirements].enabled && (
                <MacroInputWithOperator
                  value={
                    (
                      equipmentRequirements[
                        key as keyof typeof equipmentRequirements
                      ] as MacroWithValue
                    ).value
                  }
                  operator={
                    (
                      equipmentRequirements[
                        key as keyof typeof equipmentRequirements
                      ] as MacroWithValue
                    ).operator
                  }
                  onValueChange={(value) =>
                    updateMacroWithValue('equipmentRequirements', key, 'value', value)
                  }
                  onOperatorChange={(operator) =>
                    updateMacroWithValue('equipmentRequirements', key, 'operator', operator)
                  }
                  operatorOptions={OPERATOR_OPTIONS}
                  min={1}
                />
              )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
