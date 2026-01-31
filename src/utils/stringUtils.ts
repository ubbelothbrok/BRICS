/**
 * Converts a string to Title Case (capitalizes the start of each word).
 * @param str The string to convert.
 * @returns The title-cased string.
 */
export const toTitleCase = (str: string): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
