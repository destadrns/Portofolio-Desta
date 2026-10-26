// Reads numbers out of localized highlight copy so they can be set as figures.
// Copy stays as written in src/data; this only decides how it is displayed.
export type Figure = { before: string; value: string; after: string };

export function splitNumber(text: string): Figure | null {
  const match = /\d+(?:[.,]\d+)?/.exec(text);
  if (!match) return null;
  return {
    before: text.slice(0, match.index).trim(),
    value: match[0],
    after: text.slice(match.index + match[0].length).trim(),
  };
}

export type Highlight =
  | { kind: 'metrics'; items: Figure[] } // "MAE 7,55 siklus, RMSE 9,19, R² 0,91"
  | { kind: 'figure'; figure: Figure } // "200 test otomatis: …"
  | { kind: 'text'; text: string };

export function readHighlight(text: string): Highlight {
  // Split on comma + space only, so a decimal comma ("7,55") stays inside its number.
  const parts = text.split(/,\s+/).map(splitNumber);
  if (parts.length > 1 && parts.every((p): p is Figure => p !== null)) return { kind: 'metrics', items: parts };
  const lead = splitNumber(text);
  if (lead && !lead.before) return { kind: 'figure', figure: lead };
  return { kind: 'text', text };
}
