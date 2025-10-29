export const saveToFile = (data: any, name: string) => {
    const text = typeof data === 'string' ? data : JSON.stringify(data);

    const blob = new Blob([text], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();

    URL.revokeObjectURL(url);
};
