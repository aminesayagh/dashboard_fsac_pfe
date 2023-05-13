export function destroyQuery (query: string | string[]): string {
    if(Array.isArray(query)) return query[0];
    return query;
}

export function isValidAttributeName(obj: object, attributeName: string): boolean {
    return attributeName in obj;
}


export function hasValue<T extends object>(obj: T, value: any): boolean {
    return Object.values(obj).find(val => val === value) !== undefined;
  }