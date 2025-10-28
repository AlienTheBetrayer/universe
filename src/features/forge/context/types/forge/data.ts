import type { ForgeCardData } from './cards';
import type { ForgeEffectData } from './effects';

export type ForgePage = 'default' | 'save_load';

export interface ForgeData {
    // cards
    cards: ForgeCardData[];
    cardDraggingIdx: number | false;
    awaitingActionIdx: number | false;
    awaitingCancelCardIdx: number | false;

    // effects
    effectSlots: ForgeEffectData[];
    currentEffectHoveredIdx?: React.RefObject<number | false>;

    // world
    isWorldFullscreen: boolean;

    // page
    currentPage: ForgePage;
}
