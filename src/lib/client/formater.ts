import { getFormatedDate } from '$lib/helper';

export const getYYYYMMDD = (dateStr: string | Date): string  => {
  const dateObj = getFormatedDate(dateStr);
  return `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
}

export const getMMDD = (dateStr: string| Date): string => {
  const dateObj = getFormatedDate(dateStr);
  return `${dateObj.month}-${dateObj.day}`;
}