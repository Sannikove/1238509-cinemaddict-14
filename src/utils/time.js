const MINUTES_IN_HOUR = 60;

export const convertHours = (minutes) => {
  if (minutes >= MINUTES_IN_HOUR) {
    return Math.floor(minutes / MINUTES_IN_HOUR) + 'h' + minutes % MINUTES_IN_HOUR + 'm';
  }
  return minutes + 'm';
};
