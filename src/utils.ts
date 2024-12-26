export function formatDate(inputDate: string): string {
  console.trace({ inputDate })
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
