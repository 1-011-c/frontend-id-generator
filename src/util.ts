export function immutableReplace<T>(arr: T[], element: T, index: number) {
    return [...arr.slice(0, index), element, ...arr.slice(index + 1)]
}

export function immutableDelete<T>(arr: T[], index: number) {
    return arr.filter((item, idx) => idx !== index);
}
