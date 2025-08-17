import { COUNT_OPTIONS, OPERATOR_OPTIONS, TIER_OPTIONS } from '../../data/stash-macros';
import type { Operator } from '../../types/stash-search';
import type { AffixTierProps } from '../types/component-props';
import { MacroCheckbox, SectionContainer, SectionHeader } from '../ui';

export function AffixTiersSection({
  affixTiers,
  addAffixTier,
  updateAffixTier,
  removeAffixTier,
}: AffixTierProps) {
  return (
    <SectionContainer>
      <div className="flex justify-between items-center mb-4">
        <SectionHeader className="mb-0">Affix Tiers</SectionHeader>
        <button
          onClick={addAffixTier}
          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm"
        >
          Add Tier
        </button>
      </div>
      <div className="space-y-4">
        {affixTiers.map((affix, index) => (
          <div key={index} className="border border-gray-600 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <MacroCheckbox
                checked={affix.enabled}
                onChange={(checked) => updateAffixTier(index, 'enabled', checked)}
                label={`Affix Tier ${index + 1}`}
              />
              <button
                onClick={() => removeAffixTier(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
            {affix.enabled && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Count</label>
                  <select
                    value={affix.count}
                    onChange={(e) => updateAffixTier(index, 'count', parseInt(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    {COUNT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tier</label>
                  <select
                    value={affix.tier}
                    onChange={(e) => updateAffixTier(index, 'tier', parseInt(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    {TIER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Operator</label>
                  <select
                    value={affix.operator}
                    onChange={(e) => updateAffixTier(index, 'operator', e.target.value as Operator)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    {OPERATOR_OPTIONS.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
