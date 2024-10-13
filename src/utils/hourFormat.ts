export const hourFormat = (date: Date | string) => {
  const dateToFormat = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateToFormat)
}
