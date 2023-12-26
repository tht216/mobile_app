import React, {useState, useEffect} from 'react';
import {Polyline} from 'react-native-maps';
import {getPixelSize} from '../../utils/pixelsSize';
import {useDirectionMutation} from '../../utils/goongapi';
import decodePolyline from 'decode-google-map-polyline';
import {colors} from '../../themes/Colors';
export const MapDirections = ({origin, destination, mapRef}) => {
  const [directions, setDirections] = useState([]);
  const [direction] = useDirectionMutation();
  useEffect(() => {
    if (!destination) {
      setDirections([]);
      return;
    }
    console.log(origin, destination);
    direction({origin, destination})
      .unwrap()
      .then(payload => {
        console.log('a');
        console.log(payload);
        console.log(payload.routes[0].overview_polyline.points);
        const coordinates = decodePolyline(
          payload.routes[0].overview_polyline.points,
        ).map(value => {
          return {latitude: value.lat, longitude: value.lng};
        });
        console.log(coordinates);
        setDirections(coordinates);
        // setDirections(payload)
      })
      .catch(error => console.log(error));
  }, [origin, destination]);

  if ((!origin && !destination) || !directions.length) {
    return null;
  }

  return (
    <Polyline
      coordinates={directions}
      strokeColor={colors.ORANGE}
      strokeWidth={4}
    />
  );
};
