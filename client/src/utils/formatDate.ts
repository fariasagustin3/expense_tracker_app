export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
  const firstDayOfMonth = `${year}-${month}-01T00:00:00`
  const currentDay = isoDateTime
  const currentMonth = `${year}-${month}`

  return {
    currentMonth,
    currentDay,
    firstDayOfMonth,
    isoDateTime
  }
}