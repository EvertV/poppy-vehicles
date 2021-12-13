interface Store {
  vehicles: ServerVehicle[];
  selectedVehicle?: ServerVehicle;
  zones: ServerZone[];
  filters: string[];
  setVehicles: (vehicles: ServerVehicle[]) => void;
  setSelectedVehicle: (vehicle: ServerVehicle) => void;
  setZones: (zones: ServerZone[]) => void;
  setFilters: (filters: string[]) => void;
}
