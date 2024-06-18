export function toSentenceCase(str) {
    return str
        .trim()
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}

