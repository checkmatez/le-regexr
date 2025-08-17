import type { ClassRequirement, ItemRarity, ItemType, SearchPreset } from '../types/stash-search';

// Item potential macro definitions
export const ITEM_POTENTIAL_MACROS = {
  LP: {
    code: 'LP',
    name: 'Legendary Potential',
    description: "Non-Weaver's Will unique items",
    hasValue: true,
    defaultValue: 1,
    maxValue: 4,
  },
  WW: {
    code: 'WW',
    name: "Weaver's Will",
    description: "Weaver's Will unique or legendary items",
    hasValue: true,
    defaultValue: 20,
    maxValue: 28,
  },
  FP: {
    code: 'FP',
    name: 'Forging Potential',
    description: 'Available Forging Potential',
    hasValue: true,
    defaultValue: 1,
    maxValue: 70,
  },
  WT: {
    code: 'WT',
    name: 'Enchantable Idols',
    description: 'Enchantable idols',
    hasValue: false,
  },
  PT: {
    code: 'PT',
    name: 'Potential Tier',
    description: 'Items for unique rerolling in Gauntlet of Strife',
    hasValue: true,
    defaultValue: 20,
    maxValue: 28,
  },
  SwapAttributes: {
    code: 'SwapAttributes',
    name: 'Swap Attributes',
    description: 'Items affected by Relic of the Observer',
    hasValue: false,
  },
} as const;

// Item rarity options
export const ITEM_RARITIES: { value: ItemRarity; label: string; description: string }[] = [
  { value: 'normal', label: 'Normal', description: 'Normal rarity items' },
  { value: 'magic', label: 'Magic', description: 'Magic rarity items' },
  { value: 'rare', label: 'Rare', description: 'Rare rarity items' },
  { value: 'exalted', label: 'Exalted', description: 'Exalted rarity items' },
  { value: 'unique', label: 'Unique', description: 'Unique rarity items' },
  { value: 'legendary', label: 'Legendary', description: 'Legendary rarity items' },
  { value: 'set', label: 'Set', description: 'Set rarity items' },
];

// Class requirements
export const CLASS_REQUIREMENTS: { value: ClassRequirement; label: string }[] = [
  { value: 'Acolyte', label: 'Acolyte' },
  { value: 'Mage', label: 'Mage' },
  { value: 'Primalist', label: 'Primalist' },
  { value: 'Rogue', label: 'Rogue' },
  { value: 'Sentinel', label: 'Sentinel' },
];

// Item types
export const ITEM_TYPES: { value: ItemType; label: string; description: string }[] = [
  { value: 'Set', label: 'Set Bonus', description: 'Items that grant set bonuses' },
  { value: 'RealSet', label: 'Set Item', description: 'Actual set items' },
  { value: 'ReforgedSet', label: 'Reforged Set', description: 'Reforged set items' },
  { value: 'Experimentable', label: 'Experimentable', description: 'Boots, gloves, or belts' },
  { value: 'WeaverIdol', label: 'Weaver Idol', description: 'Weaver idols' },
];

// Equipment requirement macros
export const EQUIPMENT_MACROS = {
  Lvl: {
    code: 'Lvl',
    name: 'Level',
    description: 'Required level',
    hasValue: true,
    defaultValue: 1,
  },
  CoF: {
    code: 'CoF',
    name: 'Circle of Fortune',
    description: 'Circle of Fortune tagged items',
    hasValue: false,
  },
  MG: {
    code: 'MG',
    name: "Merchant's Guild",
    description: "Merchant's Guild tagged items",
    hasValue: false,
  },
  Trade: {
    code: 'Trade',
    name: 'Tradeable',
    description: 'Items that can be traded',
    hasValue: false,
  },
} as const;

// Affix count macros
export const AFFIX_COUNT_MACROS = {
  Prefixes: {
    code: 'prefixes',
    name: 'Prefixes',
    description: 'Number of prefix affixes',
    maxValue: 2,
  },
  Suffixes: {
    code: 'suffixes',
    name: 'Suffixes',
    description: 'Number of suffix affixes',
    maxValue: 2,
  },
  Affixes: {
    code: 'affixes',
    name: 'Total Affixes',
    description: 'Total number of affixes',
    maxValue: 4,
  },
  Sealed: {
    code: 'sealed',
    name: 'Sealed Affixes',
    description: 'Number of sealed affixes',
    maxValue: 2,
  },
  Experimental: {
    code: 'experimental',
    name: 'Experimental Affixes',
    description: 'Number of experimental affixes',
    maxValue: 1,
  },
  Personal: {
    code: 'personal',
    name: 'Personal Affixes',
    description: 'Number of personal affixes',
    maxValue: 1,
  },
} as const;

// Common search presets
export const SEARCH_PRESETS: SearchPreset[] = [
  {
    name: 'High-tier Exalted Items',
    description: 'Items with at least 1 T6+ affix',
    searchString: 'T6+',
    config: {
      affixTiers: [
        {
          tier: 6,
          count: 1,
          operator: '+' as const,
        },
      ],
    },
  },
  {
    name: 'Double T7 Exalted',
    description: 'Items with at least 2 T7 affixes',
    searchString: '2T7',
    config: {
      affixTiers: [
        {
          tier: 7,
          count: 2,
          operator: '=' as const,
        },
      ],
    },
  },
  {
    name: 'Legendary Potential Uniques',
    description: 'Unique items with legendary potential',
    searchString: 'LP1+',
    config: {
      itemPotential: {
        LP: { enabled: true, value: 1, operator: '+' as const },
        WW: { enabled: false, value: 0, operator: '+' as const },
        PT: { enabled: false, value: 0, operator: '+' as const },
        WT: { enabled: false },
        FP: { enabled: false, value: 0, operator: '+' as const },
        SwapAttributes: { enabled: false },
      },
    },
  },
  {
    name: 'High Potential Uniques',
    description: 'LP3+ or WW20+ items',
    searchString: 'LP3+|WW20+',
    config: {
      itemPotential: {
        LP: { enabled: true, value: 3, operator: '+' as const },
        WW: { enabled: true, value: 20, operator: '+' as const },
        PT: { enabled: false, value: 0, operator: '=' as const },
        WT: { enabled: false },
        FP: { enabled: false, value: 0, operator: '=' as const },
        SwapAttributes: { enabled: false },
      },
    },
  },
  {
    name: 'Open Prefix T7 Exalts',
    description: 'T7 exalted items with open prefix slots',
    searchString: 'prefixes1&T7',
    config: {
      affixTiers: [
        {
          tier: 7,
          count: 1,
          operator: '+' as const,
        },
      ],
      affixCounts: {
        Prefixes: { enabled: true, value: 1, operator: '=' as const },
        Suffixes: { enabled: false, value: 0, operator: '=' as const },
        Affixes: { enabled: false, value: 0, operator: '=' as const },
        Sealed: { enabled: false, value: 0, operator: '=' as const },
        Experimental: { enabled: false, value: 0, operator: '=' as const },
        Personal: { enabled: false, value: 0, operator: '=' as const },
      },
    },
  },
  {
    name: 'Trade-ready T7 Items',
    description: 'T7 items that can be traded',
    searchString: 'T7&Trade',
    config: {
      affixTiers: [
        {
          tier: 7,
          count: 1,
          operator: '+' as const,
        },
      ],
      equipmentRequirements: {
        Lvl: { enabled: false, value: 1, operator: '=' as const },
        CoF: { enabled: false },
        MG: { enabled: false },
        Trade: { enabled: true },
      },
    },
  },
];

// Common regex patterns
export const REGEX_PATTERNS = [
  {
    name: 'Helmet',
    pattern: 'helmet',
    description: 'Helmet items',
  },
  {
    name: 'Body Armor',
    pattern: 'body armor',
    description: 'Body armor items',
  },
  {
    name: 'Gloves',
    pattern: 'gloves',
    description: 'Glove items',
  },
  {
    name: 'Belt',
    pattern: 'belt',
    description: 'Belt items',
  },
  {
    name: 'Boots',
    pattern: 'boots',
    description: 'Boot items',
  },
  {
    name: 'Sword',
    pattern: 'sword',
    description: 'Sword items',
  },
  {
    name: 'Axe',
    pattern: 'axe',
    description: 'Axe items',
  },
  {
    name: 'Mace',
    pattern: 'mace',
    description: 'Mace items',
  },
  {
    name: 'Dagger',
    pattern: 'dagger',
    description: 'Dagger items',
  },
  {
    name: 'Scepter',
    pattern: 'scepter',
    description: 'Scepter items',
  },
  {
    name: 'Wand',
    pattern: 'wand',
    description: 'Wand items',
  },
  {
    name: 'Spear',
    pattern: 'spear',
    description: 'Spear items',
  },
  {
    name: 'Staff',
    pattern: 'staff',
    description: 'Staff items',
  },
  {
    name: 'Bow',
    pattern: 'bow',
    description: 'Bow items',
  },
  {
    name: 'Quiver',
    pattern: 'quiver',
    description: 'Quiver items',
  },
  {
    name: 'Shield',
    pattern: 'shield',
    description: 'Shield items',
  },
  {
    name: 'Catalyst',
    pattern: 'catalyst',
    description: 'Catalyst items',
  },
  {
    name: 'Ring',
    pattern: 'ring',
    description: 'Ring items',
  },
  {
    name: 'Amulet',
    pattern: 'amulet',
    description: 'Amulet items',
  },
  {
    name: 'Relic',
    pattern: 'relic',
    description: 'Relic items',
  },
  {
    name: 'Crit Items',
    pattern: 'crit',
    description: 'Items containing "crit"',
  },
  {
    name: 'Dexterity 11-14',
    pattern: '1[1-4] dexterity',
    description: 'Items with 11-14 dexterity',
  },
];

// Tier options for affix tier selectors
export const TIER_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  value: i + 1,
  label: `T${i + 1}`,
}));

// Count options for affix tier count selectors
export const COUNT_OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}T`,
}));

// Operator options
export const OPERATOR_OPTIONS = [
  { value: '=' as const, label: 'Exact (=)', symbol: '' },
  { value: '+' as const, label: 'At least (+)', symbol: '+' },
  { value: '-' as const, label: 'At most (-)', symbol: '-' },
];
