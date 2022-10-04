export const getLocal = (key) => {
    return localStorage[key]
}

export const setLocal = (key, value) => {
    return localStorage[key] = value
}