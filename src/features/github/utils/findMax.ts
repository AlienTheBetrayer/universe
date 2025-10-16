export const findMax = (forms: any[]) => {
    if(forms.length === 0)
        return -1;
    
    return forms.reduce((acc, val) => {
        return val.idx > acc.idx ? val : acc;
    }).idx;
}