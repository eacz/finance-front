export const hourFormat = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
