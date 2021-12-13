interface ServerZone {
  geom: {
    geometry: {
      coordinates: LatLngExpression[][][];
      type: string;
    };
    properties: {
      createdAt: string;
      name: string;
      updatedAt: string;
    };
  };
  name: string;
}
