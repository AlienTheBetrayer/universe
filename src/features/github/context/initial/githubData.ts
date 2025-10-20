import type { GithubData } from '../types/data';
import { GithubDefaultBranch } from './githubStrings';

export const GithubContextInitialData: GithubData = {
    description: {
        about: 'Stars rapidly floating around...',
        forks: 0,
        stars: 0,
        watching: 0,
        topics: [],
        repositoryName: 'The Universe',
    },
    visibility: {
        languages: true,
        packages: true,
        releases: true,
    },
    currentBranch: 0,
    globalIdx: 0,
    currentForm: false,
    currentCommit: false,
    branches: [
        {
            idx: 0,
            commits: [],
            name: GithubDefaultBranch,
            forms: [
                {
                    idx: 0,
                    name: 'hi',
                    tags: ['bye', 'whatever'],
                    content: {
                        author: 'Gleb',
                        email: 'alienthebusinessman@gmail.com',
                        message: 'hello there?',
                    },
                },
            ],
        },
    ],
};
