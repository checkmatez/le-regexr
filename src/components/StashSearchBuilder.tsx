import { useCallback, useEffect, useRef, useState } from 'react';
import { AFFIX_COUNT_MACROS, SEARCH_PRESETS } from '../data/stash-macros';
import type { AffixTier, MacroWithValue, Operator, SearchState } from '../types/stash-search';
import {
  clearURLState,
  generateShareableLink,
  getStateFromURL,
  updateURL,
} from '../utils/url-state';
import {
  AffixCountsSection,
  AffixTiersSection,
  ClassRequirementsSection,
  CustomSearchSection,
  EquipmentRequirementsSection,
  ItemPotentialSection,
  ItemRaritySection,
  ItemTypesSection,
  OutputSection,
  PresetSection,
  SpecialMacrosSection,
} from './sections';

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
  const [state, setState] = useState<SearchState>(() => {
    // Initialize state from URL on first load
    return getStateFromURL(createInitialState());
  });
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const updateTimeoutRef = useRef<number | undefined>(undefined);

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

  // Calculate search string directly from state (no need for useState + useEffect)
  const searchString = generateSearchString(state);

  // Debounced URL update when search string changes
  useEffect(() => {
    // Clear existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Set new timeout for URL update (debounce)
    updateTimeoutRef.current = window.setTimeout(() => {
      updateURL(searchString);
    }, 500);

    // Cleanup timeout on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [searchString]);

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
        ...(prevState[category] as Record<string, any>),
        [key]: {
          ...(prevState[category] as Record<string, any>)[key],
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
        ...(prevState[category] as Record<string, any>),
        [key]: { enabled },
      },
    }));
  };

  // Handle set changes (class requirements, item types)
  const toggleSetItem = <T,>(category: 'classRequirements' | 'itemTypes', item: T) => {
    setState((prevState) => {
      const newSet = new Set(prevState[category]) as Set<T>;
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return {
        ...prevState,
        [category]: newSet as any,
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

  // Share current search string as link
  const shareState = async () => {
    try {
      const shareableLink = generateShareableLink(searchString);
      await navigator.clipboard.writeText(shareableLink);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      console.error('Failed to copy shareable link:', err);
    }
  };

  // Clear all
  const clearAll = () => {
    setState(createInitialState());
    clearURLState();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Last Epoch Stash Search Builder</h1>
        <p className="text-gray-300">
          Build complex stash search strings using an intuitive interface
        </p>
      </div>

      <OutputSection
        searchString={searchString}
        copied={copied}
        shared={shared}
        onCopy={copyToClipboard}
        onShare={shareState}
        onClear={clearAll}
      />

      <PresetSection selectedPreset={state.selectedPreset} onPresetChange={handlePresetChange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Column 1: Item Properties */}
        <div className="space-y-6">
          <ItemPotentialSection
            itemPotential={state.itemPotential}
            updateMacroWithValue={updateMacroWithValue}
          />
          <ItemRaritySection
            itemRarity={state.itemRarity}
            onRarityChange={(rarity) => setState((prev) => ({ ...prev, itemRarity: rarity }))}
          />
        </div>

        {/* Column 2: Requirements & Types */}
        <div className="space-y-6">
          <ClassRequirementsSection
            classRequirements={state.classRequirements}
            toggleSetItem={toggleSetItem}
          />
          <ItemTypesSection itemTypes={state.itemTypes} toggleSetItem={toggleSetItem} />
          <EquipmentRequirementsSection
            equipmentRequirements={state.equipmentRequirements}
            updateMacroWithValue={updateMacroWithValue}
          />
        </div>

        {/* Column 3: Affixes */}
        <div className="space-y-6">
          <AffixTiersSection
            affixTiers={state.affixTiers}
            addAffixTier={addAffixTier}
            updateAffixTier={updateAffixTier}
            removeAffixTier={removeAffixTier}
          />
          <AffixCountsSection
            affixCounts={state.affixCounts}
            updateMacroWithValue={updateMacroWithValue}
          />
        </div>
      </div>

      <CustomSearchSection
        customRegex={state.customRegex}
        textSearch={state.textSearch}
        onCustomRegexChange={(value) => setState((prev) => ({ ...prev, customRegex: value }))}
        onTextSearchChange={(value) => setState((prev) => ({ ...prev, textSearch: value }))}
      />

      <SpecialMacrosSection
        swapAttributes={state.swapAttributes}
        onSwapAttributesChange={(enabled) =>
          setState((prev) => ({
            ...prev,
            swapAttributes: { enabled },
          }))
        }
      />
    </div>
  );
}
