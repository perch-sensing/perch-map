/**
 * Converts unix timestamp to a date string in the provided format.
 * @param {number} time Unix timestamp
 * @param {object} dateFormat Formatting settings for toLocaleString
 * @returns date string
 */
export function unixTimeToDate(time, dateFormat) {
  const date = new Date(time);
  date.setDate(date.getDate() + 1);
  return date.toLocaleString("en-US", dateFormat);
}

/**
 * Checks if a provided breakpoint is currently triggered.
 * @param {string} breakpoint a CSS media query representing a breakpoint
 * @returns whether breakpoint is triggered
 */
export function breakpointActive(mediaQuery) {
  const bp = "(" + mediaQuery.split(/[()]/g)[1] + ")";
  return matchMedia(bp).matches;
}
