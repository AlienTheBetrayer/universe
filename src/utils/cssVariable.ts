export const cssVariable = (variable: string): string => {
    const root = document.documentElement;
    const computed = getComputedStyle(root).getPropertyValue(variable).trim();

    return computed;
};
