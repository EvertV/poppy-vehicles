import create from 'zustand'
import type { SetState, GetState } from 'zustand'

export const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>): Store => ({
  vehicles: [],
  selectedVehicle: undefined,
  zones: [],
  filters: ["car", "step", "scooter"],
  setVehicles: (vehicles: ServerVehicle[]) => set({ vehicles: vehicles }),
  setSelectedVehicle: (vehicle: ServerVehicle) => ({ selectedVehicle: vehicle }),
  setZones: (zones: ServerZone[]) => set({ zones: zones }),
  setFilters: (filters: string[]) => set({ filters: filters })
}))
