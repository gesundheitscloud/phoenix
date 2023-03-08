/**
 * Escape a string to be inserted into the SQLite database
 * @param dirty The dirty, unescaped string
 * @returns An escaped string
 */
export const escapeString = (dirty: string): string => dirty.replace(/\'/g, "''");
