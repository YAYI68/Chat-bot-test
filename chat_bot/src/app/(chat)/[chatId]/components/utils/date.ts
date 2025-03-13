export function formatDateWithOrdinal(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const day = date.getDate();
  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  const ordinalSuffix = getOrdinalSuffix(day);

  // Replace the day number with the day number + suffix
  return formattedDate.replace(
    /\d+/,
    (day: string) => `${day}${ordinalSuffix}`,
  );
}
