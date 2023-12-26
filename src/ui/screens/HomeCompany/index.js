import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import {routes} from '../../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  logOutAccount,
  setAddress,
  setLocation,
} from '../../../utils/userSlicer';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomCard} from '../../components/CustomCard';
import GetLocation from 'react-native-get-location';
import {
  useGeocodeLocationMutation,
  useSearchLocationMutation,
} from '../../../utils/goongapi';
import Loading from '../../components/Loading';
import {
  saveAddress,
  saveLat,
  saveLong,
  saveServiceType,
} from '../../../utils/pickupSlice';
import {getToken} from '../../../utils/localstorage';
import {
  useGetDetailCompanyQuery,
  useHistoryPickupCompanyQuery,
  useStatisticPickupByMonthCompanyQuery,
  useStatisticPickupByServiceCompanyQuery,
} from '../../../utils/api';
import {socket} from '../../../utils/socket';
import {LineChart} from 'react-native-chart-kit';
import CustomPieChart from '../../components/CustomPieChart';
import {ref} from 'yup';
const HomeCompany = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const drawerRef = useRef(null);
  // const [socket, setSocket] = useState(null);
  const address = useSelector(selector => selector.userReduce.address);
  const [geocodeLocation] = useGeocodeLocationMutation();
  const {isLoading, data, error} = useGetDetailCompanyQuery();
  const max = useRef(0);
  const {
    isLoading: isFetching,
    data: history,
    error: errorHistory,
    refetch,
  } = useHistoryPickupCompanyQuery();
  const {
    isLoading: isFetchingMonth,
    data: historyMonth,
    error: errorHistoryMonth,
    refetch: refetchHistory,
  } = useStatisticPickupByMonthCompanyQuery();
  const {
    isLoading: isFetchingService,
    data: historyService,
    error: errorHistoryService,
    refetch: refetchService,
  } = useStatisticPickupByServiceCompanyQuery();
  useEffect(() => {
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 60000,
    // })
    //   .then(async locations => {
    //     dispatch(setLocation(`${locations.latitude}, ${locations.longitude}`));
    //     dispatch(saveLat(locations.latitude));
    //     dispatch(saveLong(locations.longitude));
    //     geocodeLocation(`${locations.latitude}, ${locations.longitude}`)
    //       .unwrap()
    //       .then(payload => {
    //         console.log(payload.results[0]);
    //         dispatch(setAddress(payload.results[0].formatted_address));
    //         dispatch(saveAddress(payload.results[0].formatted_address));
    //         setLoading(false);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     console.warn(code, message);
    //   });
    // const newSocket = io('http://192.168.1.5:3000');
    // setSocket(newSocket);
    // socket.emit('login', data?.data?._id?._id);
    // newSocket.on('notification-count', (count) => {
    //   setNotification(count);
    // });

    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    function onNotificationEvent(value) {
      setNotification(notification => notification + value);
      refetch();
      refetchHistory();
      refetchService();
    }
    socket.on('notification-count', onNotificationEvent);
    return () => {
      socket.off('notification-count');
    };
  }, [socket]);

  const onClickMenu = () => {
    dispatch(logOutAccount());
  };
  const handleNoti = () => {
    setNotification(0);
    drawerRef.current?.openDrawer();
  };
  if (!isFetchingService) {
    max.current = historyService?.pickup.reduce(
      (max, value) => (max < value.total ? value.total : max),
      0,
    );
  }
  const renderPieChart = array => <CustomPieChart array={array} />;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      {/* background */}
      <Image
        source={require('../../../assets/images/background.png')}
        style={styles.background}
      />
      {/* user bar */}
      <View style={styles.topbar}>
        {/* user image */}
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 50,
            backgroundColor: colors.WHITE,
            elevation: 12,
            shadowColor: '#000',
          }}
          onPress={onClickMenu}>
          <Icon name="log-out-outline" size={27} color={colors.ORANGE} />
        </TouchableOpacity>
        {/* location */}
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.CURRENTLOCATION)}
          style={styles.mapContainer}>
          <Icon name="ios-location" size={25} color={colors.WHITE} />
          <Text numberOfLines={1} style={styles.mapText}>
            {address}
          </Text>
        </TouchableOpacity>
        {/* notification */}
        <TouchableOpacity onPress={handleNoti}>
          <Image
            style={{borderRadius: 50}}
            source={require('../../../assets/images/user.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* top view */}
        <View style={styles.topview}>
          <View style={styles.welcomecontainer}>
            <Text style={styles.welcomemessage}>
              {`Hello,<br/>${data?.data?._id?.name || ''}`
                .split('<br/>')
                .join('\n')}
            </Text>
          </View>
        </View>

        {/* body view */}
        <View style={styles.bodyContainer}>
          {/* status bar */}
          <CustomCard
            elevated={true}
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 24,
              marginTop: -40,
              padding: 30,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Balance
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                ${history?.pickup.reduce(
                  (balance, value) =>
                    value.status === 'Done' ? balance + value.price : balance,
                  0,
                ).toFixed(2)}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Total Pickup
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {history?.pickup.length}
              </Text>
            </View>
          </CustomCard>
          <View style={{flex: 1}}></View>

          {/* line chart */}
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            {'The number of Orders in 2023'.toLocaleUpperCase()}
          </Text>
          {(isFetchingMonth && (
            <View style={{height: 220, justifyContent: 'center'}}>
              <ActivityIndicator size="small" color={colors.ORANGE} />
            </View>
          )) || (
            <LineChart
              data={{
                labels: historyMonth?.pickup.map(value =>
                  new Date(Date.UTC(2023, value._id - 1, 1)).toLocaleString(
                    'default',
                    {
                      month: 'short',
                    },
                  ),
                ),

                datasets: [
                  {data: historyMonth?.pickup.map(value => value.count)},
                ],
                // ,
              }}
              width={units.width - units.width / 7} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundGradientFrom: colors.DARKORANGE,
                backgroundGradientTo: colors.ORANGE,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '3',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}>
            {/* pie chart */}
            {(isFetchingService && (
              <View
                style={{
                  height: 220,
                  justifyContent: 'center',
                  width: units.width / 2,
                }}>
                <ActivityIndicator size="small" color={colors.ORANGE} />
              </View>
            )) || (
              <View style={{width: units.width / 2}}>
                {renderPieChart(
                  historyService?.pickup.map(value => {
                    return {
                      title: value._id,
                      value: value.total,
                      color: `hsl(12.809, ${
                        (value.total / max.current) * 99
                      }%, ${(value.total / max.current) * 65}%)`,
                    };
                  }),
                )}
              </View>
            )}
            {/* notification */}
            <CustomCard
              style={{
                flex: 1,
                backgroundColor: colors.LIGHTGREY,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}></CustomCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCompany;

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
    position: 'relative',
  },
  topview: {
    marginVertical: 40,
    marginHorizontal: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomemessage: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  background: {
    height: 270,
    width: '100%',
    position: 'absolute',
    top: 0,
    opacity: 0.1,
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    flex: 1,
  },
  mapText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 50,
    shadowColor: 'yellow',
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: units.width / 14,
    marginVertical: units.height / 30,
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 24,
  },
  title: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.DARK,
    marginTop: units.height / 30,
  },
  listCategories: {
    marginTop: 24,
  },
  textCategories: activeCategory => {
    const style = {
      fontWeight: '600',
      color: activeCategory ? colors.WHITE : colors.DARKGRAY,
    };
    return style;
  },
  categoriesContainer: activeCategory => {
    const style = {
      width: '50%',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginRight: 4,
      borderRadius: 50,
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      backgroundColor: activeCategory ? colors.LIGHTORANGE : 'rgba(0,0,0,0.07)',
    };
    return style;
  },
  emptyText: {
    color: colors.ORANGE,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  list: {
    padding: 0,
  },
});
