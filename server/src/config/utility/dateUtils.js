function getDaysBetweenDates(date1, date2) {
  // Convert to UTC to avoid DST issues
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  // Calculate difference in days
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

module.exports = {
  getDaysBetweenDates,
};
