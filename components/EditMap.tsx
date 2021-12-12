import { FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { LatLngBounds, latLngBounds } from "leaflet"

interface Props {
  setBounds: (bounds: LatLngBounds | undefined) => void
}

const EditMap = ({ setBounds }: Props) => {
  const map = useMap();

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
