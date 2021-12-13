import { FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { latLngBounds } from "leaflet"
import { useStore } from 'store';


const EditMap = () => {
  const map = useMap();
  const setBounds = useStore((state: Store) => state.setBounds)

  return (
    <FeatureGroup>
      <EditControl
        position='topright'
        onCreated={(e: any) => {
          setBounds(latLngBounds(e.layer._latlngs));
        }}
        onDeleted={() => {
          setBounds(map.getBounds())
        }}
        draw={{
          rectangle: true,
          polyline: false,
          circle: false,
          marker: false,
          circlemarker: false,
          polygon: false
        }}
      />
    </FeatureGroup>
  )
};

export default EditMap;
