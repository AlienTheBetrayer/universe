export interface StellarContent {
    firstTitle: string;
    firstDescription: string;
    secondTitle: string;
    secondDescription: string;
}

export interface Stellar {
    idx: number;
    x: number;
    y: number;
    content: StellarContent;
}

export interface StellarState {
    stellars: Stellar[];
    selectedIdx: number | false;
    hoveredIdx: number | false;
    movingIdx: number | false;
    isEditing: boolean;
    isMoveWaiting: boolean;
    isTutorialVisible: boolean;
    isMessageBoxVisible: boolean;
    viewport: { width: number; height: number };
}