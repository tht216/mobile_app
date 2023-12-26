import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import GetLocation from 'react-native-get-location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  useGeocodeLocationMutation,
  useSearchLocationMutation,
} from '../../../utils/goongapi';
import CustomMarker from '../../components/CustomMarker';
import {ActivityIndicator} from 'react-native-paper';
import AntD from 'react-native-vector-icons/AntDesign';
import {GOONG_API_KEY, OUTER_CARD_WIDTH} from '../../../utils/constant';
import Card from '../../components/Card';
const {width} = Dimensions.get('window');

export default function CurrentLocation() {
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = React.useState([]);
  let _map = React.useRef(null);
  let flatlistRef = React.useRef(null);
  let mapIndex = useRef(0);
  let scrollAnimation = useRef(new Animated.Value(0)).current;
  const [geocodeLocation, {data, isLoading, error}] =
    useGeocodeLocationMutation();
  const [searchLocation] = useSearchLocationMutation();

  const initialRegion = {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const convertMarkers = place => {
    return {
      coordinate: {
        latitude: place?.geometry?.location?.lat || 0,
        longitude: place?.geometry?.location?.lng || 0,
      },
      title: place.name || 'Your current location',
      description: 'Not Available',
      address: place.formatted_address || 'Not Available',
      rating: 0,
      phoneNo: 'Not Available',
      totalRatings: '',
      image: 'NA',
    };
  };
  // useEffect(() => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //     .then(async locations => {
  //       geocodeLocation(`${locations.latitude}, ${locations.longitude}`)
  //         .unwrap()
  //         .then(payload => {
  //           console.log(convertMarkers(payload.results[0]));
  //           setMarkers([{...convertMarkers(payload.results[0])}]);
  //           setLoading(false);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // }, []);
  const onMapReady = () => {
    if (!markers.length) return;
    setTimeout(() => {
      _map.current.animateToRegion({
        ...(markers[0] ? markers[0].coordinate : initialRegion),
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      });
    }, 10);
  };
  const onMarkerPress = ({
    _targetInst: {
      return: {key: markerID},
    },
  }) => {
    // In this case we dont need to animate to region, it happens by default
    mapIndex.current = markerID;
    flatlistRef.current?.scrollToIndex({index: markerID, animate: true});
  };
  const onPressLeft = () => {
    if (!mapIndex.current || mapIndex.current < 0) return;
    let newIndex = parseInt(mapIndex.current) - 1;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
  };

  const onPressRight = () => {
    if (mapIndex.current >= markers.length - 1) return;
    let newIndex = parseInt(mapIndex.current) + 1;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
  };

  const onScroll = event => {
    let xDistance = event.nativeEvent.contentOffset.x;
    if (xDistance % OUTER_CARD_WIDTH == 0) {
      // When scroll ends
      let index = xDistance / OUTER_CARD_WIDTH;
      if (mapIndex.current == index) return;
      console.log('scroll end reached');
      mapIndex.current = index;
      const coordinate = markers[index] && markers[index].coordinate;
      setTimeout(
        () =>
          _map.current?.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: initialRegion.latitudeDelta,
              longitudeDelta: initialRegion.longitudeDelta,
            },
            350,
          ),
        10,
      );
    }
  };
  const renderCard = ({item}) => <Card item={item} />;
  const renderMarker = (item, index) => (
    <CustomMarker
      key={index}
      index={index}
      marker={item}
      onMarkerPress={onMarkerPress}
    />
  );
  if (loading)
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size={55} color="grey" />
      </View>
    );
  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        onMapReady={onMapReady}
        initialRegion={initialRegion}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {markers.map(renderMarker)}
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'data' is the selected place data
            // 'details' is the full place details object
            console.log(data, details);
          }}
          query={{
            key: GOONG_API_KEY,
            language: 'en',
            components: 'country:vn', // restrict results to Vietnam
          }}
        /> */}
      </MapView>
      <View style={styles.outerCard}>
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressLeft}
          style={styles.left}>
          <AntD name="leftcircle" style={styles.icon} />
        </TouchableOpacity>
        <Animated.FlatList
          initialNumToRender={markers.length}
          ref={flatlistRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={OUTER_CARD_WIDTH}
          snapToAlignment="center"
          keyExtractor={(item, index) => index.toString()}
          style={styles.scrollView}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollAnimation,
                  },
                },
              },
            ],
            {useNativeDriver: true, listener: onScroll},
          )}
          data={markers}
          renderItem={renderCard}
        />
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressRight}
          style={styles.right}>
          <AntD name="rightcircle" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  outerCard: {
    height: 160,
    width: width,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  hitslop: {
    top: 30,
    right: 30,
    left: 30,
    bottom: 30,
  },
  icon: {fontSize: 22, color: 'grey'},
  left: {position: 'absolute', left: 5, zIndex: 10},
  right: {position: 'absolute', right: 5},
});
