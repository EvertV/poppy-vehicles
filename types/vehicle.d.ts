interface ServerVehicle {
  autonomy: number;
  bookUnitPrice: number;
  bookUnitPriceNet: number;
  chargingReward: number;
  dayCapPrice: number;
  dayCapPriceNet: number;
  discountPercent: number;
  fuelingReward: number;
  includedKilometers: number;
  isElligibleForCharging: false;
  isElligibleForFueling: false;
  locationLatitude: number;
  locationLongitude: number;
  model: {
    energy: string;
    energyCapacity: number;
    gearbox: string;
    name: string;
    type: "scooter" | "car" | "step";
    uuid: string;
  };
  moveUnitPrice: number;
  moveUnitPriceNet: number;
  name: string;
  onboardingUrl: string | undefined;
  overKilometerPrice: number;
  overKilometerPriceNet: number;
  pauseUnitPrice: number;
  pauseUnitPriceNet: number;
  plate: string;
  status: string;
  unlockFee: number;
  unlockFeeNet: number;
  uuid: string;
}
