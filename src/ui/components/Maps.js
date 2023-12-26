import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import tw from 'twrnc';
import CustomMarker from './CustomMarker';
import {MapDirections} from './MapDirections';

export const Map = style => {
  const mapRef = useRef();
  const location = useSelector(selector => selector.userReduce.location);
  const destination = useSelector(selector => selector.userReduce.destination);
  const address = useSelector(selector => selector.userReduce.address);
  const origin = location.split(', ');
  useEffect(() => {}, [origin]);
  console.log(
    destination.name
      ? `${destination.coordinate.latitude},${destination.coordinate.longitude}`
      : null,
  );

  return (
    <MapView
      key={`${origin[0]},${origin[1]}`}
      ref={mapRef}
      style={[tw`flex-1 relative`, {...style}]}
      //   showsUserLocation={true}
      userInterfaceStyle={'dark'}
      initialRegion={{
        latitude: +origin[0] || 10.4181252, //+origin[0] || 0,
        longitude: +origin[1] || 107.2817437, //+origin[1] || 0,
        latitudeDelta:
          Math.abs(destination?.coordinate?.latitude - 10.4181252) * 0.001 ||
          0.005,
        longitudeDelta:
          Math.abs(destination?.coordinate?.longitude - 10.4181252) * 0.001 ||
          0.005,
      }}>
      <MapDirections
        mapRef={mapRef}
        origin={`10.4181252,107.2817437`}
        destination={
          destination.name
            ? `${destination.coordinate.latitude},${destination.coordinate.longitude}`
            : null
        }
      />
      {/* {!origin.length && ( */}
      <Marker
        title="Origin"
        description={'Trần Phú, Phước Hải, Đất Đỏ, Bà Rịa-Vũng Tàu'}
        coordinate={{
          latitude: +origin[0] || 10.4181252, //+origin[0] || 0,
          longitude: +origin[1] || 107.2817437, //+origin[1] || 0,
        }}></Marker>
      {/* destintion */}
      {destination.name && (
        <CustomMarker
          key={1}
          index={1}
          marker={destination}
          onMarkerPress={() => {}}
        />
      )}
    </MapView>
  );
};
