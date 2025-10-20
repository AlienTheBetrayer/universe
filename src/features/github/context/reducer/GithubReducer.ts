import type { GithubContextData } from '../GithubContext';
import { GithubContextInitialData } from '../initial/githubData';
import type { Branch, Form, FormContent, GithubPage } from '../types/dataTypes';

export type GithubReducerAction =
    // data
    | { type: 'DATA_SET'; data: GithubContextData }
    | { type: 'DATA_SET_PAGE'; page: GithubPage }
    | { type: 'DATA_SET_INITIAL' }

    // description
    | { type: 'DESCRIPTION_SET_ABOUT'; value: string }
    | { type: 'DESCRIPTION_SET_TOPICS'; value: string[] }
    | { type: 'DESCRIPTION_SET_REPO_NAME'; value: string }
    | {
          type: 'DESCRIPTION_SET';
          about: string;
          topics: string[];
          repositoryName: string;
      }
    | { type: 'DESCRIPTION_INCREMENT_STARS' }
    | { type: 'DESCRIPTION_DECREMENT_STARS' }
    | { type: 'DESCRIPTION_INCREMENT_FORKS' }
    | { type: 'DESCRIPTION_DECREMENT_FORKS' }
    | { type: 'DESCRIPTION_INCREMENT_WATCHING' }
    | { type: 'DESCRIPTION_DECREMENT_WATCHING' }

    // visibility
    | { type: 'VISIBILITY_SET_PACKAGES'; flag: boolean }
    | { type: 'VISIBILITY_SET_RELEASES'; flag: boolean }
    | { type: 'VISIBILITY_SET_LANGUAGES'; flag: boolean }
    | {
          type: 'VISIBILITY_SET';
          packages: boolean;
          releases: boolean;
          languages: boolean;
      }

    // branch
    | { type: 'BRANCHES_SET'; branches: Branch[] }
    | { type: 'BRANCHES_DELETE_CURRENT' }
    | { type: 'BRANCHES_FOCUS'; idx: number }
    | { type: 'BRANCHES_CREATE'; name: string }

    // form
    | { type: 'FORM_FOCUS'; idx: number | false }
    | { type: 'FORM_REMOVE_TAG_CURRENT'; tag: string }
    | { type: 'FORM_ADD_TAG_CURRENT'; tag: string }
    | { type: 'FORM_DELETE_CURRENT' }
    | { type: 'FORM_CREATE'; name: string }
    | {
          type: 'FORM_EDIT_COMMIT';
          commitName: string;
          commitDescription: string;
          formContent: FormContent;
      }

    // commit
    | { type: 'COMMIT_FOCUS'; idx: number | false }

    // tutorial
    | { type: 'TUTORIAL_SET_VISIBILITY'; flag: boolean };

export const GithubReducer = (
    state: GithubContextData,
    action: GithubReducerAction
): GithubContextData => {
    switch (action.type) {
        // data
        case 'DATA_SET':
            return action.data;
        case 'DATA_SET_PAGE':
            return { ...state, page: action.page };
        case 'DATA_SET_INITIAL':
            return { ...state, data: GithubContextInitialData };

        // description
        case 'DESCRIPTION_SET':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        about: action.about,
                        topics: action.topics,
                        repositoryName: action.repositoryName,
                    },
                },
            };

        case 'DESCRIPTION_SET_ABOUT':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        about: action.value,
                    },
                },
            };
        case 'DESCRIPTION_SET_TOPICS':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        topics: action.value,
                    },
                },
            };
        case 'DESCRIPTION_SET_REPO_NAME':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        repositoryName: action.value,
                    },
                },
            };
        case 'DESCRIPTION_INCREMENT_FORKS':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        forks: state.data.description.forks + 1,
                    },
                },
            };
        case 'DESCRIPTION_DECREMENT_FORKS':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        forks:
                            state.data.description.forks > 0
                                ? state.data.description.forks - 1
                                : state.data.description.forks,
                    },
                },
            };
        case 'DESCRIPTION_INCREMENT_STARS':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        stars: state.data.description.stars + 1,
                    },
                },
            };
        case 'DESCRIPTION_DECREMENT_STARS':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        stars:
                            state.data.description.stars > 0
                                ? state.data.description.stars - 1
                                : state.data.description.stars,
                    },
                },
            };
        case 'DESCRIPTION_INCREMENT_WATCHING':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        watching: state.data.description.watching + 1,
                    },
                },
            };
        case 'DESCRIPTION_DECREMENT_WATCHING':
            return {
                ...state,
                data: {
                    ...state.data,
                    description: {
                        ...state.data.description,
                        watching:
                            state.data.description.watching > 0
                                ? state.data.description.watching - 1
                                : state.data.description.watching,
                    },
                },
            };

        // visibility
        case 'VISIBILITY_SET':
            return {
                ...state,
                data: {
                    ...state.data,
                    visibility: {
                        ...state.data.visibility,
                        languages: action.languages,
                        packages: action.packages,
                        releases: action.releases,
                    },
                },
            };

        case 'VISIBILITY_SET_LANGUAGES':
            return {
                ...state,
                data: {
                    ...state.data,
                    visibility: {
                        ...state.data.visibility,
                        languages: action.flag,
                    },
                },
            };
        case 'VISIBILITY_SET_PACKAGES':
            return {
                ...state,
                data: {
                    ...state.data,
                    visibility: {
                        ...state.data.visibility,
                        packages: action.flag,
                    },
                },
            };
        case 'VISIBILITY_SET_RELEASES':
            return {
                ...state,
                data: {
                    ...state.data,
                    visibility: {
                        ...state.data.visibility,
                        releases: action.flag,
                    },
                },
            };

        // branch
        case 'BRANCHES_SET':
            return {
                ...state,
                data: { ...state.data, branches: action.branches },
            };
        case 'BRANCHES_DELETE_CURRENT':
            return {
                ...state,
                data: {
                    ...state.data,
                    branches: state.data.branches.filter(
                        (b) => b.idx !== state.data.currentBranch
                    ),
                },
            };
        case 'BRANCHES_FOCUS':
            return {
                ...state,
                data: { ...state.data, currentBranch: action.idx },
            };
        case 'BRANCHES_CREATE':
            return {
                ...state,
                data: {
                    ...state.data,
                    globalIdx: state.data.globalIdx + 1,
                    branches: [
                        ...state.data.branches,
                        {
                            idx: state.data.globalIdx + 1,
                            name: action.name,
                            forms: [],
                            commits: [],
                        },
                    ],
                    currentBranch: state.data.globalIdx + 1,
                    currentCommit: false,
                    currentForm: false,
                },
            };

        // form
        case 'FORM_FOCUS':
            return {
                ...state,
                data: { ...state.data, currentForm: action.idx },
            };
        case 'FORM_REMOVE_TAG_CURRENT':
            return {
                ...state,
                data: {
                    ...state.data,
                    branches: state.data.branches.map((b) =>
                        b.idx === state.data.currentBranch
                            ? {
                                  ...b,
                                  forms: b.forms.map((f) =>
                                      f.idx === state.data.currentForm
                                          ? {
                                                ...f,
                                                tags: f.tags.filter(
                                                    (t) => t !== action.tag
                                                ),
                                            }
                                          : f
                                  ),
                              }
                            : b
                    ),
                },
            };
        case 'FORM_ADD_TAG_CURRENT':
            return {
                ...state,
                data: {
                    ...state.data,
                    branches: state.data.branches.map((b) =>
                        b.idx === state.data.currentBranch
                            ? {
                                  ...b,
                                  forms: b.forms.map((f) =>
                                      f.idx === state.data.currentForm
                                          ? {
                                                ...f,
                                                tags: [...f.tags, action.tag],
                                            }
                                          : f
                                  ),
                              }
                            : b
                    ),
                },
            };
        case 'FORM_DELETE_CURRENT':
            return {
                ...state,
                data: {
                    ...state.data,
                    globalIdx: state.data.globalIdx + 1,
                    branches: state.data.branches.map((b) =>
                        b.idx === state.data.currentBranch
                            ? {
                                  ...b,
                                  forms: b.forms.filter(
                                      (f) => f.idx !== state.data.currentForm
                                  ),
                                  commits: [
                                      ...b.commits,
                                      {
                                          idx: state.data.globalIdx + 1,
                                          name: `${
                                              b.forms.find(
                                                  (f) =>
                                                      f.idx ===
                                                      state.data.currentForm
                                              )?.name
                                          } form deleted`,
                                          description: '',
                                          pushedAt: Date.now(),
                                          type: 'form-deletion',
                                      },
                                  ],
                              }
                            : b
                    ),
                },
            };
        case 'FORM_CREATE':
            const newForm: Form = {
                idx: state.data.globalIdx + 1,
                name: action.name,
                tags: [],
            };

            return {
                ...state,
                data: {
                    ...state.data,
                    globalIdx: state.data.globalIdx + 2,
                    branches: state.data.branches.map((b) =>
                        b.idx === state.data.currentBranch
                            ? {
                                  ...b,
                                  forms: [...b.forms, newForm],

                                  commits: [
                                      ...b.commits,
                                      {
                                          idx: state.data.globalIdx + 2,
                                          name: `${action.name} form created`,
                                          description: '',
                                          pushedAt: Date.now(),
                                          type: 'form-creation',
                                          form: newForm,
                                      },
                                  ],
                              }
                            : b
                    ),
                },
            };
        case 'FORM_EDIT_COMMIT':
            return {
                ...state,
                data: {
                    ...state.data,
                    currentForm: false,
                    globalIdx: state.data.globalIdx + 1,
                    branches: state.data.branches.map((b) =>
                        b.idx === state.data.currentBranch
                            ? {
                                  ...b,
                                  commits: [
                                      ...b.commits,
                                      {
                                          idx: state.data.globalIdx + 1,
                                          form: b.forms.find(
                                              (f) =>
                                                  f.idx ===
                                                  state.data.currentForm
                                          ),
                                          name: action.commitName,
                                          description: action.commitDescription,
                                          pushedAt: Date.now(),
                                          data: action.formContent,
                                          type: 'form-content-change',
                                      },
                                  ],
                                  forms: b.forms.map((f) =>
                                      f.idx === state.data.currentForm
                                          ? {
                                                ...f,
                                                content: action.formContent,
                                            }
                                          : f
                                  ),
                              }
                            : b
                    ),
                },
            };

        // commit
        case 'COMMIT_FOCUS':
            return {
                ...state,
                data: { ...state.data, currentCommit: action.idx },
            };

        // tutorial
        case 'TUTORIAL_SET_VISIBILITY':
            return { ...state, tutorialVisible: action.flag };
    }
};
