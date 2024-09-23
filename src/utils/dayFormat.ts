export const dayFormat = (date: Date) => {
  return new Intl.DateTimeFormat('es', {
    dateStyle: 'short',
  }).format(date)
}
