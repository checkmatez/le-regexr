import { COUNT_OPTIONS, OPERATOR_OPTIONS, TIER_OPTIONS } from '../../data/stash-macros';
import type { Operator } from '../../types/stash-search';
import type { AffixTierProps } from '../types/component-props';
import { SectionContainer, SectionHeader } from '../ui';

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
          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 md:py-1 rounded text-xs md:text-sm font-medium"
        >
          Add Tier
        </button>
      </div>
      <div className="space-y-4">
        {affixTiers.map((affix, index) => (
          <div key={index} className="border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-300">Affix Tier {index + 1}</h4>
              <button
                onClick={() => removeAffixTier(index)}
                className="text-red-400 hover:text-red-300 text-sm px-2 py-1 hover:bg-gray-700 rounded"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Count</label>
                <select
                  value={affix.count}
                  onChange={(e) => updateAffixTier(index, 'count', parseInt(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-gray-100 focus:border-amber-400 focus:outline-none"
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
                  className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-gray-100 focus:border-amber-400 focus:outline-none"
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
                  className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-gray-100 focus:border-amber-400 focus:outline-none"
                >
                  {OPERATOR_OPTIONS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
