import { create } from 'zustand'

interface GeneralState {
  isOpen: boolean
  openModal: () => void,
  onClose: () => void
}

export const useGeneralStore = create<GeneralState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
