export const loadFromFile = async (allowedExtensions: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = allowedExtensions;

    const file = await new Promise<File | null>((resolve) => {
        input.onchange = () => resolve(input.files?.[0] ?? null);
        input.click();
    });

    if (!file) return;
    const text = await file.text();
    return text;
};
