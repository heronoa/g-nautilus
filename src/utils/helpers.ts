export const isValidUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const parseDate = (
  dateString: string | undefined | null
): Date | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
};
