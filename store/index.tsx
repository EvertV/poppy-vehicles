import create from 'zustand'
import type { SetState, GetState } from 'zustand'
import { LatLngBounds } from "leaflet"

export const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>): Store => ({
  vehicles: [],
  selectedVehicle: undefined,
  zones: [],
  filters: ["car", "step", "scooter"],
  bounds: undefined,
  setVehicles: (vehicles: ServerVehicle[]) => {
    set({
      vehicles: vehicles
    })
  },
  setSelectedVehicle: (vehicle?: ServerVehicle) => set({ selectedVehicle: vehicle }),
  setZones: (zones: ServerZone[]) => set({ zones: zones }),
  setFilters: (filters: string[]) => {
    set({ filters: filters })
    const vehicles = get().vehicles;
    let newVehicles = vehicles.filter((v: ServerVehicle) => filters.includes(v.model.type))
    if (JSON.stringify(get().vehicles) !== JSON.stringify(newVehicles)) {
      set({
        vehicles: newVehicles
      })
    }
  },
  setBounds: (bounds: LatLngBounds) => {
    set({ bounds: bounds })
    const vehicles = get().vehicles;
    let newVehicles = vehicles;
    if (bounds && bounds.isValid()) {
      newVehicles = newVehicles.filter((v: ServerVehicle) => bounds.contains({ lat: v.locationLatitude, lng: v.locationLongitude }))
    }
    if (JSON.stringify(get().vehicles) !== JSON.stringify(newVehicles)) {
      set({
        vehicles: newVehicles
      })
    }
  }
}))
