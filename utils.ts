import { DateTime } from 'luxon';

export const formatDate = (date) => {
  const value = DateTime.fromISO(date);
  return value.toLocaleString(DateTime.DATE_HUGE);
};
