import { useCallback, useEffect, useState } from 'react';
import {
  AFFIX_COUNT_MACROS,
  CLASS_REQUIREMENTS,
  COUNT_OPTIONS,
  EQUIPMENT_MACROS,
  ITEM_POTENTIAL_MACROS,
  ITEM_RARITIES,
  ITEM_TYPES,
  OPERATOR_OPTIONS,
  REGEX_PATTERNS,
  SEARCH_PRESETS,
  TIER_OPTIONS,
} from '../data/stash-macros';
import type {
  AffixTier,
  ItemRarity,
  MacroWithValue,
  Operator,
  SearchState,
} from '../types/stash-search';

// Initial state
const createInitialState = (): SearchState => ({
  selectedPreset: null,
  itemPotential: {
    LP: { enabled: false, value: 0, operator: '=' },
    WW: { enabled: false, value: 0, operator: '=' },
    PT: { enabled: false, value: 20, operator: '=' },
    WT: { enabled: false },
    FP: { enabled: false },
  },
  itemRarity: null,
  classRequirements: new Set(),
  itemTypes: new Set(),
  equipmentRequirements: {
    Lvl: { enabled: false, value: 1, operator: '=' },
    CoF: { enabled: false },
    MG: { enabled: false },
    Trade: { enabled: false },
  },
  affixTiers: [],
  affixCounts: {
    Prefixes: { enabled: false, value: 0, operator: '=' },
    Suffixes: { enabled: false, value: 0, operator: '=' },
    Affixes: { enabled: false, value: 0, operator: '=' },
    Sealed: { enabled: false, value: 0, operator: '=' },
    Experimental: { enabled: false, value: 0, operator: '=' },
    Personal: { enabled: false, value: 0, operator: '=' },
  },
  swapAttributes: { enabled: false },
  customRegex: '',
  textSearch: '',
  expressionOperators: [],
});

export default function StashSearchBuilder() {
  const [state, setState] = useState<SearchState>(createInitialState);
  const [searchString, setSearchString] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate search string from current state
  const generateSearchString = useCallback((currentState: SearchState): string => {
    const parts: string[] = [];

    // Item potential
    Object.entries(currentState.itemPotential).forEach(([key, macro]) => {
      if (macro.enabled) {
        if ('value' in macro) {
          const operator = macro.operator === '=' ? '' : macro.operator;
          parts.push(`${key}${macro.value}${operator}`);
        } else {
          parts.push(key);
        }
      }
    });

    // Item rarity
    if (currentState.itemRarity) {
      parts.push(currentState.itemRarity);
    }

    // Class requirements
    currentState.classRequirements.forEach((cls) => {
      parts.push(cls);
    });

    // Item types
    currentState.itemTypes.forEach((type) => {
      parts.push(type);
    });

    // Equipment requirements
    Object.entries(currentState.equipmentRequirements).forEach(([key, macro]) => {
      if (macro.enabled) {
        if ('value' in macro) {
          const operator = macro.operator === '=' ? '' : macro.operator;
          parts.push(`${key}${macro.value}${operator}`);
        } else {
          parts.push(key);
        }
      }
    });

    // Affix tiers
    currentState.affixTiers.forEach((affix) => {
      if (affix.enabled) {
        const countPrefix = affix.count > 1 ? affix.count : '';
        const operator = affix.operator === '=' ? '' : affix.operator;
        parts.push(`${countPrefix}T${affix.tier}${operator}`);
      }
    });

    // Affix counts
    Object.entries(currentState.affixCounts).forEach(([key, macro]) => {
      if (macro.enabled) {
        const operator = macro.operator === '=' ? '' : macro.operator;
        const macroName = AFFIX_COUNT_MACROS[key as keyof typeof AFFIX_COUNT_MACROS].code;
        parts.push(`${macroName}${macro.value}${operator}`);
      }
    });

    // Special macros
    if (currentState.swapAttributes.enabled) {
      parts.push('SwapAttributes');
    }

    // Custom regex
    if (currentState.customRegex.trim()) {
      parts.push(currentState.customRegex);
    }

    // Text search (as regex)
    if (currentState.textSearch.trim()) {
      parts.push(`/${currentState.textSearch}/`);
    }

    // Join with & by default (can be enhanced for custom operators)
    return parts.join('&');
  }, []);

  // Update search string when state changes
  useEffect(() => {
    const newSearchString = generateSearchString(state);
    setSearchString(newSearchString);
  }, [state, generateSearchString]);

  // Handle preset selection
  const handlePresetChange = (presetName: string) => {
    const preset = SEARCH_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setState((prevState) => ({
        ...createInitialState(),
        ...preset.config,
        selectedPreset: presetName,
      }));
    }
  };

  // Handle macro with value changes
  const updateMacroWithValue = (
    category: keyof SearchState,
    key: string,
    field: keyof MacroWithValue,
    value: boolean | number | Operator,
  ) => {
    setState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [key]: {
          ...prevState[category][key],
          [field]: value,
        },
      },
    }));
  };

  // Handle simple macro changes
  const updateSimpleMacro = (category: keyof SearchState, key: string, enabled: boolean) => {
    setState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [key]: { enabled },
      },
    }));
  };

  // Handle set changes (class requirements, item types)
  const toggleSetItem = <T,>(category: 'classRequirements' | 'itemTypes', item: T) => {
    setState((prevState) => {
      const newSet = new Set(prevState[category]);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return {
        ...prevState,
        [category]: newSet,
      };
    });
  };

  // Add new affix tier
  const addAffixTier = () => {
    setState((prevState) => ({
      ...prevState,
      affixTiers: [
        ...prevState.affixTiers,
        { enabled: true, tier: 6, count: 1, operator: '+' as Operator },
      ],
    }));
  };

  // Update affix tier
  const updateAffixTier = (
    index: number,
    field: keyof AffixTier,
    value: boolean | number | Operator,
  ) => {
    setState((prevState) => ({
      ...prevState,
      affixTiers: prevState.affixTiers.map((affix, i) =>
        i === index ? { ...affix, [field]: value } : affix,
      ),
    }));
  };

  // Remove affix tier
  const removeAffixTier = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      affixTiers: prevState.affixTiers.filter((_, i) => i !== index),
    }));
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(searchString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Clear all
  const clearAll = () => {
    setState(createInitialState());
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Last Epoch Stash Search Builder</h1>
        <p className="text-gray-300">
          Build complex stash search strings using an intuitive interface
        </p>
      </div>

      {/* Preset Selection */}
      <div className="mb-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Quick Presets</h2>
        <select
          value={state.selectedPreset || ''}
          onChange={(e) => (e.target.value ? handlePresetChange(e.target.value) : null)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none"
        >
          <option value="">Select a preset...</option>
          {SEARCH_PRESETS.map((preset) => (
            <option key={preset.name} value={preset.name}>
              {preset.name} - {preset.description}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Column 1: Item Properties */}
        <div className="space-y-6">
          {/* Item Potential */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Item Potential</h3>
            <div className="space-y-4">
              {Object.entries(ITEM_POTENTIAL_MACROS).map(([key, macro]) => (
                <div key={key} className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={state.itemPotential[key as keyof typeof state.itemPotential].enabled}
                      onChange={(e) =>
                        updateMacroWithValue('itemPotential', key, 'enabled', e.target.checked)
                      }
                      className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span className="font-medium">{macro.name}</span>
                  </label>
                  <p className="text-sm text-gray-400">{macro.description}</p>
                  {macro.hasValue &&
                    state.itemPotential[key as keyof typeof state.itemPotential].enabled && (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          min="0"
                          value={
                            (
                              state.itemPotential[
                                key as keyof typeof state.itemPotential
                              ] as MacroWithValue
                            ).value
                          }
                          onChange={(e) =>
                            updateMacroWithValue(
                              'itemPotential',
                              key,
                              'value',
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                        <select
                          value={
                            (
                              state.itemPotential[
                                key as keyof typeof state.itemPotential
                              ] as MacroWithValue
                            ).operator
                          }
                          onChange={(e) =>
                            updateMacroWithValue(
                              'itemPotential',
                              key,
                              'operator',
                              e.target.value as Operator,
                            )
                          }
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          {OPERATOR_OPTIONS.map((op) => (
                            <option key={op.value} value={op.value}>
                              {op.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Item Rarity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Item Rarity</h3>
            <div className="space-y-2">
              {ITEM_RARITIES.map((rarity) => (
                <label key={rarity.value || 'none'} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rarity"
                    value={rarity.value || ''}
                    checked={state.itemRarity === rarity.value}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        itemRarity: (e.target.value as ItemRarity) || null,
                      }))
                    }
                    className="border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                  />
                  <span>{rarity.label}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rarity"
                  value=""
                  checked={state.itemRarity === null}
                  onChange={() => setState((prev) => ({ ...prev, itemRarity: null }))}
                  className="border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                />
                <span>Any Rarity</span>
              </label>
            </div>
          </div>
        </div>

        {/* Column 2: Requirements & Types */}
        <div className="space-y-6">
          {/* Class Requirements */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Class Requirements</h3>
            <div className="space-y-2">
              {CLASS_REQUIREMENTS.map((cls) => (
                <label key={cls.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={state.classRequirements.has(cls.value)}
                    onChange={() => toggleSetItem('classRequirements', cls.value)}
                    className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                  />
                  <span>{cls.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Item Types */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Item Types</h3>
            <div className="space-y-2">
              {ITEM_TYPES.map((type) => (
                <div key={type.value} className="space-y-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={state.itemTypes.has(type.value)}
                      onChange={() => toggleSetItem('itemTypes', type.value)}
                      className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span>{type.label}</span>
                  </label>
                  <p className="text-sm text-gray-400 ml-6">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Requirements */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Equipment Requirements</h3>
            <div className="space-y-4">
              {Object.entries(EQUIPMENT_MACROS).map(([key, macro]) => (
                <div key={key} className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={
                        state.equipmentRequirements[key as keyof typeof state.equipmentRequirements]
                          .enabled
                      }
                      onChange={(e) =>
                        updateMacroWithValue(
                          'equipmentRequirements',
                          key,
                          'enabled',
                          e.target.checked,
                        )
                      }
                      className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span>{macro.name}</span>
                  </label>
                  <p className="text-sm text-gray-400">{macro.description}</p>
                  {macro.hasValue &&
                    state.equipmentRequirements[key as keyof typeof state.equipmentRequirements]
                      .enabled && (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={
                            (
                              state.equipmentRequirements[
                                key as keyof typeof state.equipmentRequirements
                              ] as MacroWithValue
                            ).value
                          }
                          onChange={(e) =>
                            updateMacroWithValue(
                              'equipmentRequirements',
                              key,
                              'value',
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                        <select
                          value={
                            (
                              state.equipmentRequirements[
                                key as keyof typeof state.equipmentRequirements
                              ] as MacroWithValue
                            ).operator
                          }
                          onChange={(e) =>
                            updateMacroWithValue(
                              'equipmentRequirements',
                              key,
                              'operator',
                              e.target.value as Operator,
                            )
                          }
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        >
                          {OPERATOR_OPTIONS.map((op) => (
                            <option key={op.value} value={op.value}>
                              {op.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Affixes */}
        <div className="space-y-6">
          {/* Affix Tiers */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-amber-400">Affix Tiers</h3>
              <button
                onClick={addAffixTier}
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm"
              >
                Add Tier
              </button>
            </div>
            <div className="space-y-4">
              {state.affixTiers.map((affix, index) => (
                <div key={index} className="border border-gray-600 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={affix.enabled}
                        onChange={(e) => updateAffixTier(index, 'enabled', e.target.checked)}
                        className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                      />
                      <span className="font-medium">Affix Tier {index + 1}</span>
                    </label>
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
                          onChange={(e) =>
                            updateAffixTier(index, 'count', parseInt(e.target.value))
                          }
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
                          onChange={(e) =>
                            updateAffixTier(index, 'operator', e.target.value as Operator)
                          }
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
          </div>

          {/* Affix Counts */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Affix Counts</h3>
            <div className="space-y-4">
              {Object.entries(AFFIX_COUNT_MACROS).map(([key, macro]) => (
                <div key={key} className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={state.affixCounts[key as keyof typeof state.affixCounts].enabled}
                      onChange={(e) =>
                        updateMacroWithValue('affixCounts', key, 'enabled', e.target.checked)
                      }
                      className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span>{macro.name}</span>
                  </label>
                  <p className="text-sm text-gray-400">{macro.description}</p>
                  {state.affixCounts[key as keyof typeof state.affixCounts].enabled && (
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={macro.maxValue}
                        value={state.affixCounts[key as keyof typeof state.affixCounts].value}
                        onChange={(e) =>
                          updateMacroWithValue(
                            'affixCounts',
                            key,
                            'value',
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                      />
                      <select
                        value={state.affixCounts[key as keyof typeof state.affixCounts].operator}
                        onChange={(e) =>
                          updateMacroWithValue(
                            'affixCounts',
                            key,
                            'operator',
                            e.target.value as Operator,
                          )
                        }
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                      >
                        {OPERATOR_OPTIONS.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Input Section */}
      <div className="mb-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Custom Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Regex Pattern</label>
            <input
              type="text"
              value={state.customRegex}
              onChange={(e) => setState((prev) => ({ ...prev, customRegex: e.target.value }))}
              placeholder="/pattern/"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none"
            />
            <div className="mt-2">
              <select
                onChange={(e) => setState((prev) => ({ ...prev, customRegex: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
              >
                <option value="">Common patterns...</option>
                {REGEX_PATTERNS.map((pattern) => (
                  <option key={pattern.name} value={pattern.pattern}>
                    {pattern.name} - {pattern.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Text Search</label>
            <input
              type="text"
              value={state.textSearch}
              onChange={(e) => setState((prev) => ({ ...prev, textSearch: e.target.value }))}
              placeholder="Search for text in item names/stats"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Special Macros */}
      <div className="mb-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Special</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={state.swapAttributes.enabled}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                swapAttributes: { enabled: e.target.checked },
              }))
            }
            className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
          />
          <span>SwapAttributes</span>
          <span className="text-sm text-gray-400">- Items affected by Relic of the Observer</span>
        </label>
      </div>

      {/* Output Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Generated Search String</h2>
        <div className="space-y-4">
          <textarea
            value={searchString}
            readOnly
            className="w-full h-24 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm resize-none"
            placeholder="Your search string will appear here..."
          />
          <div className="flex space-x-4">
            <button
              onClick={copyToClipboard}
              disabled={!searchString}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-medium transition-colors"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={clearAll}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
