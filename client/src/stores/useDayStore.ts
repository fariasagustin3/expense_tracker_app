import { create } from 'zustand'
import { formatDate } from '../utils/formatDate'

interface DayState {
  startOfDay: string
  day: string
  setDay: (day: string) => void
}

export const useDayStore = create<DayState>((set) => ({
  startOfDay: '',
  day: '',
  setDay: (day: string) => set({
    day: formatDate(new Date(day)).currentDayAndTime,
    startOfDay: formatDate(new Date(day)).currentStartOfDay
  }),
}))
