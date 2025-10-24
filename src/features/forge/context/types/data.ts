import type { ForgeBlockData } from './blocks';
import type { ForgeCardData } from './cards';
import type { ForgeEffectData } from './effects';

export interface ForgeData {
    // cards
    cards: ForgeCardData[];
    cardDraggingIdx: number | false;
    awaitingActionIdx: number | false;
    awaitingCancelCardIdx: number | false;

    // effects
    effectSlots: ForgeEffectData[];

    // blocks
    blocks: ForgeBlockData[];
    selectedBlockIdx: number | false;
}
