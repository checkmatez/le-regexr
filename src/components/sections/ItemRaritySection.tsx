import { ITEM_RARITIES } from '../../data/stash-macros';
import type { ItemRarity } from '../../types/stash-search';
import type { ItemRaritySectionProps } from '../types/component-props';
import { RadioGroup, SectionContainer, SectionHeader } from '../ui';

export function ItemRaritySection({ itemRarity, onRarityChange }: ItemRaritySectionProps) {
  return (
    <SectionContainer>
      <SectionHeader>Item Rarity</SectionHeader>
      <RadioGroup<NonNullable<ItemRarity>>
        name="rarity"
        value={itemRarity}
        onChange={onRarityChange}
        options={ITEM_RARITIES.map((r) => ({
          value: r.value as NonNullable<ItemRarity>,
          label: r.label,
        }))}
        allowNone={true}
        noneLabel="Any Rarity"
      />
    </SectionContainer>
  );
}
