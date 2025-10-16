import type { GithubData } from "../GithubContext";
import { GithubDefaultBranch } from "./githubStrings";

export const GithubContextInitialData: GithubData = {
    description: {
        about: 'Stars rapidly floating around...',
        forks: 0,
        stars: 0,
        watching: 0,
        topics: [],
    },
    commits: [],
    visibility: {
        languages: true,
        packages: true,
        releases: true,
    },
    currentBranch: 0,
    currentForm: false,
    repositoryName: 'The Universe',
    branches: [
        {
            idx: 0,
            name: GithubDefaultBranch,
            forms: [{
                idx: 0,
                name: 'hi',
                tags: ['bye', 'whatever'],
                content: {
                    author: 'Gleb',
                    email: 'alienthebusinessman@gmail.com',
                    message: 'hello there?'
                }
            }]
        },
    ]
};