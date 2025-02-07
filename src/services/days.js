export const getDaysForEvent = () => {
  const currentDate = new Date();
  const targetDate = new Date("2025-03-01"); // Use YYYY-MM-DD for consistent date parsing

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up

  return daysDifference;
};
