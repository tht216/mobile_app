import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import CustomMarker from '../../components/CustomMarker';
import AntD from 'react-native-vector-icons/AntDesign';
import {OUTER_CARD_WIDTH} from '../../../utils/constant';
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import {units} from '../../../themes/Units';
import {routes} from '../../../navigation/routes';
import {
  saveCompanyId,
  saveDelivery,
  saveSubPrice,
} from '../../../utils/pickupSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  useGetCompanyMutation,
  useGetCompanyQuery,
  useGetFilterCompanyQuery,
} from '../../../utils/api';
import Loading from '../../components/Loading';
import {
  useDistanceMatrixMutation,
  useDistanceMatrixQuery,
} from '../../../utils/goongapi';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../../themes/Colors';
const {width} = Dimensions.get('window');

export default function Company({navigation}) {
  const serviceType = useSelector(selector => selector.pickupSlice.serviceType);
  const long = useSelector(selector => selector.pickupSlice.long);
  const lat = useSelector(selector => selector.pickupSlice.lat);
  const amount = useSelector(selector => selector.pickupSlice.amount);
  const {data} = useGetFilterCompanyQuery({serviceType});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [markers, setMarkers] = React.useState([]);
  const [position, setPosition] = React.useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  let _map = React.useRef(null);
  let flatlistRef = React.useRef(null);
  let mapIndex = useRef(0);
  useEffect(() => {
    if (data) {
      setIsLoading(true);
      const destinations = data?.company
        .reduce(
          (destination, value) =>
            destination + `${value.lat[0]},${value.long[0]}|`,
          '',
        )
        .slice(0, -1);
      const origins = `${lat},${long}`;
      console.log(origins, destinations);
      distanceMatrix({origins, destinations})
        .unwrap()
        .then(payload => {
          console.log(payload);
          const distance = payload.rows[0].elements.map(
            value => value.distance.value,
          );
          setPosition(
            data?.company.map((value, index) => {
              return {
                coordinate: {
                  latitude: value.lat[0],
                  longitude: value.long[0],
                },
                description: value.description[0],
                address: value.address[0],
                name: value.name[0],
                email: value.email[0],
                phone: value.phone[0],
                id: value.companyID,
                image: 'NA',
                rating: value.current_rating,
                subPrice: value.price * amount,
                distance: distance[index],
                delivery: (0.01 * distance[index]).toFixed(2),
                totalRatings: value.review,
              };
            }),
          );
        })
        .catch(error => console.log(error));

      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    setMarkers(position);
  }, [position]);
  useEffect(() => {
    if (_map.current) {
      _map.current.animateToRegion({
        ...(markers[0] ? markers[0].coordinate : initialRegion),
        latitudeDelta: initialRegion.latitudeDelta,
        longitudeDelta: initialRegion.longitudeDelta,
      });
    }
  }, [markers, _map]);
  console.log(markers);
  const initialRegion = {
    latitude: 10.7725221,
    longitude: 106.6954459,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
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
    mapIndex.current = markerID;
    flatlistRef.current?.scrollToIndex({index: markerID, animate: true});
  };
  const onPressLeft = () => {
    if (!mapIndex.current || mapIndex.current <= 0) return;
    let newIndex = parseInt(mapIndex.current) - 1;
    mapIndex.current = newIndex;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
    _map.current.animateToRegion({
      ...(markers[newIndex] ? markers[newIndex].coordinate : initialRegion),
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta,
    });
  };

  const onPressRight = () => {
    if (mapIndex.current >= markers.length - 1) return;
    let newIndex = parseInt(mapIndex.current) + 1;
    mapIndex.current = newIndex;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
    _map.current.animateToRegion({
      ...(markers[newIndex] ? markers[newIndex].coordinate : initialRegion),
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta,
    });
  };
  const onClickBack = () => {
    navigation.goBack();
  };
  const renderCard = ({item}) => {
    return (
      <Card
        item={item}
        onPress={() => {
          console.log(item);
          dispatch(saveCompanyId(item.id));
          dispatch(saveSubPrice(item.subPrice));
          dispatch(saveDelivery(item.delivery));
          navigation.navigate(routes.CHECKOUT, {title: item.name});
        }}
      />
    );
  };
  const renderMarker = (item, index) => (
    <CustomMarker
      key={index}
      index={index}
      marker={item}
      onMarkerPress={onMarkerPress}
    />
  );
  const filter = range => {
    setMarkers(position.filter(value => value.distance < range));
  };
  if (isLoading)
    return (
      <View style={styles.loadContainer}>
        <Loading />
        <View style={[styles.topBar, {top: -10}]}>
          <BackButton onPress={onClickBack} />
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BackButton onPress={onClickBack} />
        <TouchableOpacity
          onPress={() => filter(1000)}
          style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>
          <Text style={{paddingVertical: 12, paddingHorizontal: 24}}>1km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filter(2000)}
          style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>
          <Text style={{paddingVertical: 12, paddingHorizontal: 24}}>2km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filter(5000)}
          style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>
          <Text style={{paddingVertical: 12, paddingHorizontal: 24}}>5km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMarkers(position)}
          style={{backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50}}>
          <Text style={{paddingVertical: 12, paddingHorizontal: 24}}>
            {'> '}5km
          </Text>
        </TouchableOpacity>
      </View>
      <MapView
        ref={_map}
        onMapReady={onMapReady}
        initialRegion={initialRegion}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {markers?.map(renderMarker)}
      </MapView>
      <View style={styles.outerCard}>
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressLeft}
          style={styles.left}>
          <AntD name="leftcircle" style={styles.icon} />
        </TouchableOpacity>
        <Animated.FlatList
          initialNumToRender={markers?.length}
          ref={flatlistRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={OUTER_CARD_WIDTH}
          snapToAlignment="center"
          keyExtractor={(item, index) => index.toString()}
          style={styles.scrollView}
          scrollEnabled={false}
          data={markers}
          renderItem={renderCard}
        />
        {!markers?.length && (
          <View style={{backgroundColor: 'rgba(255,255,255,0.8)'}}>
            <Text style={{fontWeight: 'bold'}}>
              There has been any garbage company near you yet
            </Text>
          </View>
        )}
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
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: units.height / 30,
    zIndex: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  outerCard: {
    height: 250,
    width: width,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
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
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
