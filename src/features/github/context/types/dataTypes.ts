export interface FormContent {
    author: string;
    email: string;
    message: string;
}

export interface Form {
    idx: number;
    name: string;
    tags: string[];
    content?: FormContent;
}

type CommitType = 'form-creation' | 'form-deletion' | 'form-content-change';

export interface Commit {
    idx: number;
    name: string;
    description: string;
    pushedAt: number;
    type: CommitType;
    data?: FormContent;
    form?: Form;
}

export interface Branch {
    idx: number;
    name: string;
    forms: Form[];
    commits: Commit[];
}

export interface Description {
    about: string;
    stars: number;
    watching: number;
    forks: number;
    topics: string[];
    repositoryName: string;
}

export interface ElementsVisibility {
    releases: boolean;
    packages: boolean;
    languages: boolean;
}

export type GithubPage = 'forms' | 'commits';
