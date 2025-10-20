import type { Branch, Description, ElementsVisibility } from './dataTypes';

export interface GithubData {
    description: Description;
    visibility: ElementsVisibility;

    branches: Branch[];
    currentBranch: number;
    currentForm: number | false;
    currentCommit: number | false;
    globalIdx: number;
}
