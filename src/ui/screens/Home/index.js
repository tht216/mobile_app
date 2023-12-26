import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
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
import {API_URL, categories} from '../../../utils/constant';
import WasteCard from '../../components/WasteCard';
import Carousel from 'react-native-snap-carousel';
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
import {useGetDetailQuery, useHistoryPickupQuery} from '../../../utils/api';
import {DrawerLayoutAndroid} from 'react-native';
import io from 'socket.io-client';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [numberOfPickup, setNumberOfPickup] = useState(0)
  const {data: history} = useHistoryPickupQuery();
  const address = useSelector(selector => selector.userReduce.address);
  const [geocodeLocation] = useGeocodeLocationMutation();
  const {isLoading, data, error} = useGetDetailQuery();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(async locations => {
        dispatch(setLocation(`${locations.latitude}, ${locations.longitude}`));
        dispatch(saveLat(locations.latitude));
        dispatch(saveLong(locations.longitude));
        geocodeLocation(`${locations.latitude}, ${locations.longitude}`)
          .unwrap()
          .then(payload => {
            console.log(payload);
            dispatch(setAddress(payload.results[0].formatted_address));
            dispatch(saveAddress(payload.results[0].formatted_address));
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);
  const filter = useMemo(() => {
    if (history?.pickup) {
      setNumberOfPickup(history?.pickup.length);
    }
  }, [history?.pickup]);
  const wasteItems = [
    {
      id: 1,
      name: 'Organic',
      label: 'organic',
      image: require('../../../assets/images/organic.png'),
      desc: 'Food scraps, yard waste, and other biodegradable materials.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Organic',
          label: 'non-recycle',
          image: require('../../../assets/images/organic.png'),
          maximum: '2kg',
          desc: 'Food scraps, yard waste, and other biodegradable materials.',
        });
        dispatch(saveServiceType('Organic'));
      },
    },

    {
      id: 2,
      name: 'Plastic',
      label: 'recycle',
      image: require('../../../assets/images/plastic.png'),
      desc: 'This includes any discarded plastic material, such as bags, bottles, and packaging. Plastic waste is a major environmental concern because it can take hundreds of years to decompose and can harm wildlife.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Plastic',
          label: 'recycle',
          image: require('../../../assets/images/plastic.png'),
          maximum: '2kg',
          desc: 'This includes any discarded plastic material, such as bags, bottles, and packaging. Plastic waste is a major environmental concern because it can take hundreds of years to decompose and can harm wildlife.',
        });
        dispatch(saveServiceType('Plastic'));
      },
    },

    {
      id: 3,
      name: 'Paper',
      label: 'recycle',
      image: require('../../../assets/images/paper.png'),
      desc: 'This includes any discarded paper material, such as newspapers, magazines, and cardboard boxes. Paper waste can also be recycled and reused, which helps to conserve natural resources and reduce landfill space.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Paper',
          label: 'recycle',
          image: require('../../../assets/images/paper.png'),
          maximum: '2kg',
          desc: 'This includes any discarded paper material, such as newspapers, magazines, and cardboard boxes. Paper waste can also be recycled and reused, which helps to conserve natural resources and reduce landfill space.',
        });
        dispatch(saveServiceType('Paper'));
      },
    },

    {
      id: 4,
      name: 'Metal',
      label: 'recycle',
      image: require('../../../assets/images/metal.png'),
      desc: 'This includes any discarded metal object, such as aluminum cans, steel scrap, and appliances. Metal waste can be recycled and reused, which is beneficial for the environment and can save energy.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Metal',
          label: 'recycle',
          image: require('../../../assets/images/metal.png'),
          maximum: '2kg',
          desc: 'This includes any discarded metal object, such as aluminum cans, steel scrap, and appliances. Metal waste can be recycled and reused, which is beneficial for the environment and can save energy.',
        });
        dispatch(saveServiceType('Metal'));
      },
    },

    {
      id: 5,
      name: 'Glass',
      label: 'recycle',
      image: require('../../../assets/images/glass.png'),
      desc: 'This includes any discarded glass material, such as bottles and jars. Glass waste can also be recycled and reused, which is beneficial for the environment and can save energy.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Glass',
          label: 'recycle',
          image: require('../../../assets/images/glass.png'),
          maximum: '2kg',
          desc: 'This includes any discarded glass material, such as bottles and jars. Glass waste can also be recycled and reused, which is beneficial for the environment and can save energy.',
        });
        dispatch(saveServiceType('Glass'));
      },
    },

    {
      id: 6,
      name: 'E-waste',
      label: 'e-waste',
      image: require('../../../assets/images/e-waste.png'),
      desc: 'Electronic waste, such as computers, televisions, and cell phones.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'E-waste',
          label: 'e-waste',
          image: require('../../../assets/images/e-waste.png'),
          maximum: '2kg',
          desc: 'Electronic waste, such as computers, televisions, and cell phones.',
        });
        dispatch(saveServiceType('E-waste'));
      },
    },
    {
      id: 7,
      name: 'Hazardous',
      label: 'hazardous',
      image: require('../../../assets/images/harzadous.png'),
      desc: 'Products that are potentially dangerous to human health or the environment, such as batteries, cleaning agents, and pesticides.',
      onPress: () => {
        navigation.navigate(routes.AMOUNT, {
          name: 'Hazardous',
          label: 'hazardous',
          image: require('../../../assets/images/harzadous.png'),
          maximum: '2kg',
          desc: 'Products that are potentially dangerous to human health or the environment, such as batteries, cleaning agents, and pesticides.',
        });
        dispatch(saveServiceType('Hazardous'));
      },
    },
  ];
  const onClickMenu = () => {
    dispatch(logOutAccount());
  };
  const [activeCategory, setActiveCategory] = useState(1);
  let _carousel = null;
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
        <Icon name="notifications" size={27} color="white" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* top view */}
        <View style={styles.topview}>
          <View style={styles.welcomecontainer}>
            <Text style={styles.welcomemessage}>
              {`Hello,<br/>${data?.data?.data?.name || ''}`
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
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>Points</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {data?.data?.point}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Total Pickup
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>{numberOfPickup}</Text>
            </View>
          </CustomCard>
          {/* search bar */}
          {/* <Text style={{color: colors.BLACK, marginVertical: 24}}>
            Which collection type you want to make?
          </Text>
          <SearchInput placeholder={'Search...'} /> */}

          {/* categories */}
          <View style={styles.listCategories}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={item => item.id}
              style={{overflow: 'hidden'}}
              renderItem={({item}) => {
                isActive = item.id == activeCategory;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveCategory(item.id);
                      _carousel.snapToItem(item.id - 1);
                    }}
                    style={styles.categoriesContainer(isActive)}>
                    <Text style={styles.textCategories(isActive)}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* coffee cards */}
          <View
            style={{paddingTop: 12, paddingVertical: 4}}
            className="mt-16 py-2">
            <Carousel
              ref={c => {
                _carousel = c;
              }}
              containerCustomStyle={{overflow: 'visible'}}
              data={wasteItems}
              renderItem={({item}) => <WasteCard item={item} />}
              firstItem={1}
              loop={true}
              inactiveSlideScale={0.77}
              inactiveSlideOpacity={0.75}
              sliderWidth={400}
              itemWidth={260}
              slideStyle={{display: 'flex', alignItems: 'center'}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
  textCategories: isActive => {
    const style = {
      fontWeight: '600',
      color: isActive ? colors.WHITE : colors.DARKGRAY,
    };
    return style;
  },
  categoriesContainer: isActive => {
    const style = {
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginRight: 4,
      borderRadius: 50,
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      backgroundColor: isActive ? colors.LIGHTORANGE : 'rgba(0,0,0,0.07)',
    };
    return style;
  },
});
