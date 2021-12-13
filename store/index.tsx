import create from 'zustand'
import type { SetState, GetState } from 'zustand'
import { LatLngBounds } from "leaflet"

export const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>): Store => ({
  vehicles: [],
  selectedVehicle: undefined,
  zones: [],
  filters: ["car", "step", "scooter"],
  bounds: undefined,
  setVehicles: (serverVehicles: ServerVehicle[]) => {
    const newVehicles = serverVehicles.filter((v: ServerVehicle) => get().filters.includes(v.model.type))
    if (get().bounds && get().bounds.isValid()) {
      set({
        vehicles: newVehicles.filter((v: ServerVehicle) => get().bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude }))
      })
    } else {
      set({ vehicles: newVehicles })
    }
  },
  setSelectedVehicle: (vehicle?: ServerVehicle) => set({ selectedVehicle: vehicle }),
  setZones: (zones: ServerZone[]) => set({ zones: zones }),
  setFilters: (filters: string[]) => set({ filters: filters }),
  setBounds: (bounds: LatLngBounds[]) => set({ bounds: bounds })
}))
