import { AFFIX_COUNT_MACROS, OPERATOR_OPTIONS } from '../../data/stash-macros';
import type { AffixCountsSectionProps } from '../types/component-props';
import { MacroCheckbox, MacroInputWithOperator, SectionContainer, SectionHeader } from '../ui';

export function AffixCountsSection({ affixCounts, updateMacroWithValue }: AffixCountsSectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Affix Counts</SectionHeader>
      <div className="space-y-4">
        {Object.entries(AFFIX_COUNT_MACROS).map(([key, macro]) => (
          <div key={key} className="space-y-2">
            <MacroCheckbox
              checked={affixCounts[key as keyof typeof affixCounts].enabled}
              onChange={(checked) => updateMacroWithValue('affixCounts', key, 'enabled', checked)}
              label={macro.name}
              description={macro.description}
            />
            {affixCounts[key as keyof typeof affixCounts].enabled && (
              <MacroInputWithOperator
                value={affixCounts[key as keyof typeof affixCounts].value}
                operator={affixCounts[key as keyof typeof affixCounts].operator}
                onValueChange={(value) => updateMacroWithValue('affixCounts', key, 'value', value)}
                onOperatorChange={(operator) =>
                  updateMacroWithValue('affixCounts', key, 'operator', operator)
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
