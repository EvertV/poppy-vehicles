import { FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { LatLngBounds } from "leaflet"

interface Props {
  setBounds: (bounds: LatLngBounds) => void
}

const EditMap = ({ setBounds }: Props) => (
  <FeatureGroup>
    <EditControl
      position='topright'
      onCreated={(e: any) => {
        console.log('create', e);
        console.log('longlat', e.layer._bounds);
        setBounds(e.layer._bounds);
      }}
      onDeleted={(e: any) => console.log('delete', e)}
      draw={{
        rectangle: false
      }}
    />
  </FeatureGroup>
);

export default EditMap;
