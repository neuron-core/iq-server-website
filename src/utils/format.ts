const numbers = new Intl.NumberFormat('en-US');
const and = new Intl.ListFormat('en-GB', { type: 'conjunction' });
const or = new Intl.ListFormat('en-GB', { type: 'disjunction' });

/** 85000 → "85,000" */
export const formatNumber = (value: number) => numbers.format(value);

/** ["a", "b", "c"] → "a, b and c" */
export const listAnd = (items: string[]) => and.format(items);

/** ["a", "b", "c"] → "a, b or c" */
export const listOr = (items: string[]) => or.format(items);

/** Wraps each item in <code>, for lists rendered with set:html. */
export const asCode = (items: string[]) => items.map((item) => `<code>${item}</code>`);
