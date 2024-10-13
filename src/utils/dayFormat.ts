export const dayFormat = (date: Date | string) => {
  const dateToFormat = new Date(date)
  
  return new Intl.DateTimeFormat('es', {
    dateStyle: 'short',
  }).format(dateToFormat)
}
