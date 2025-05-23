export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const currentMonth = `${year}-${month}`
  const currentDay = `${year}-${month}-${day}`
  const firstDayOfMonth = `${year}-${month}-01`

  return {
    currentMonth,
    currentDay,
    firstDayOfMonth
  }
}
