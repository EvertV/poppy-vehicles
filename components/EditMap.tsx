import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { LatLngBounds, latLngBounds } from "leaflet"

interface Props {
  setBounds: (bounds: LatLngBounds | undefined) => void
}

const EditMap = ({ setBounds }: Props) => (
  <FeatureGroup>
    <EditControl
      position='topright'
      onCreated={(e: any) => {
        console.log('create', e);
        console.log('longlat', e.layer._latlngs);
        setBounds(latLngBounds(e.layer._latlngs));
      }}
      onDeleted={() => setBounds(undefined)}
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
);

export default EditMap;
