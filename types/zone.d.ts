interface ServerZone {
  geom: {
    geometry: {
      coordinates: number[][][];
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
