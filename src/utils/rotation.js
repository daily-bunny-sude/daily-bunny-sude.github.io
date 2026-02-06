/**
 * Returns a deterministic item from an array based on the current date.
 * @param {Array} items - The array of items to choose from.
 * @returns {any} - The selected item.
 */
export const getDailyItem = (items) => {
  if (!items || items.length === 0) return null;
  
  const today = new Date();
  // Set to midnight to ensure consistency throughout the day
  today.setHours(0, 0, 0, 0);
  
  // Calculate days since a fixed epoch (e.g., Jan 1, 1970)
  const timeDiff = today.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  const index = dayDiff % items.length;
  return items[index];
};

/**
 * Returns a detailed greeting based on the time of day.
 * @returns {string} - "Good Morning", "Good Afternoon", or "Good Evening".
 */
export const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}
