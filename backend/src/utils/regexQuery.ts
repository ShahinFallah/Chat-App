export const regexQueryForPostgres = (query : string) : string => {
    const escapedQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regexQuery = `%${escapedQuery}%`;
    return regexQuery;
}

export const regexp = (query : string) : RegExp => {
    return new RegExp(query, 'i');
}