export function unixTimeToDate(time) {
  const date = new Date(time);
  const dateString = date.toLocaleString("en-US", { timeZoneName: "short" });
  return dateString.split(",")[0];
}
