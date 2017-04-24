function <%= name.toCamelCase() %>(returnYes: boolean): string {
    console.log('this is example.ts - <%= name.toCamelCase() %>');

    if (returnYes) {
        return 'YESS!!!'
    }
    return '...umm no';
}