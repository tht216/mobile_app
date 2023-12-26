import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {units} from '../../../themes/Units';
import {routes} from '../../../navigation/routes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import { saveAmount } from '../../../utils/pickupSlice';

export default function ChooseAmount({navigation, route}) {
  const params = route.params;
  const [bag, setBag] = useState(1);
  const dispatch = useDispatch();

  // const DATA = [
  //   {
  //     id: 1,
  //     departuretime: '10:00',
  //     arrivaltime: '10:30',
  //     name: 'Lorem MRT Station',
  //     price: '5.0',
  //     onPressHandler: () => {
  //       navigation.navigate(routes.HOME, {price: '5.0'});
  //     },
  //   },
  //   {
  //     id: 2,
  //     departuretime: '10:00',
  //     arrivaltime: '10:30',
  //     name: 'Dolor MRT Station',
  //     price: '5.0',
  //     onPressHandler: () => {
  //       navigation.navigate(routes.HOME, {price: '5.0'});
  //     },
  //   },
  // ];
  // const CompanyItem = ({item}) => {
  //   return (
  //     <View
  //       style={{
  //         marginBottom: 10,
  //         borderBottomWidth: 2,
  //         //   marginHorizontal: 5,
  //         borderBottomStartRadius: 30,
  //         borderBottomEndRadius: 10,
  //         borderBottomColor: '#EBE7E6',
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           marginBottom: 10,
  //           justifyContent: 'space-between',
  //         }}>
  //         <View style={{flexDirection: 'row'}}>
  //           <Icon name="timer-outline" size={15} color="#000" />
  //           <Text
  //             style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 10}}>
  //             {item.departuretime}
  //           </Text>
  //           <Icon name="swap-horizontal-outline" size={15} color="#000" />
  //           <Text
  //             style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 10}}>
  //             {item.arrivaltime}
  //           </Text>
  //         </View>
  //         <View>
  //           <Text style={{fontWeight: 'bold', marginRight: 16}}>
  //             $ {item.price}
  //           </Text>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           marginBottom: 15,
  //           justifyContent: 'space-between',
  //         }}>
  //         <View style={{flexDirection: 'row'}}>
  //           <Icon name="location-outline" size={15} color="#000" />
  //           <Text
  //             style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 10}}>
  //             {item.name}
  //           </Text>
  //         </View>
  //         <View>
  //           <TouchableOpacity
  //             onPress={item.onPressHandler}
  //             style={{
  //               backgroundColor: colors.ORANGE,
  //               paddingHorizontal: 8,
  //               borderRadius: 5,
  //             }}>
  //             <Text style={{color: '#fff', fontWeight: 'bold'}}>Select</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  const nextStep = () => {
    navigation.navigate(routes.LOCATION);
    dispatch(saveAmount(bag))
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/9-removebg-preview.png')}
        style={{
          height: 250,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          width: '100%',
          position: 'absolute',
          backgroundColor: colors.ORANGE,
        }}
      />
      <View style={styles.topbar}>
        {/* back */}

        <BackButton onPress={() => navigation.goBack()} />
        {/* user image */}
        <Image
          source={require('../../../assets/images/user.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.topview}>
        <View style={styles.welcomecontainer}>
          <View
            style={{
              height: 240,
              width: 240,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.23,
              shadowRadius: 12.81,
              elevation: 16,
              borderRadius: 999,
            }}>
            <Image
              source={params.image}
              style={{
                height: 240,
                width: 240,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <Text style={styles.welcomemessage}>{params.name}</Text>
          <View
            style={{
              backgroundColor: colors.LIGHTORANGE,
              borderRadius: 24,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.WHITE,
              }}>
              {params.label}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: colors.BLACK,
            fontSize: 18,
            fontWeight: 'bold',
            lineHeight: 28,
            marginBottom: 12,
          }}>
          Description
        </Text>
        <Text style={{marginBottom: 12}}>{params.desc}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 4,
            }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: colors.DARKGRAY,
                fontWeight: '600',
                opacity: 60,
              }}>
              Number of bags
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: colors.DARKGRAY,
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}>
            <TouchableOpacity
              style={{marginRight: 16}}
              onPress={() => {
                setBag(bag === 1 ? bag : bag - 1);
              }}>
              <Icon
                name="remove"
                size={20}
                strokeWidth={3}
                color={colors.BLACK}
              />
            </TouchableOpacity>
            <TextInput
              style={{color: colors.BLACK, padding: 0, marginRight: 16}}
              onChangeText={value => setBag(+value)}
              value={bag < 10 ? `0${bag}` : `${bag}`}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => {
                setBag(bag + 1);
              }}>
              <Icon name="add" size={20} strokeWidth={3} color={colors.BLACK} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 24,
              color: colors.DARKGRAY,
              opacity: 60,
            }}>
            * Maximum {params.maximum} /
          </Text>
          <Image
            source={require('../../../assets/images/garbage-bag.png')}
            style={{width: 16, height: 16}}
          />
        </View>

        {/* <Text
          style={{
            marginVertical: 20,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Choose Company
        </Text>
        <View>
          <FlatList
            data={DATA}
            renderItem={CompanyItem}
            keyExtractor={item => item.id}
          />
        </View> */}
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton title="Next" onPress={nextStep} />
        <View style={styles.lineContainer}>
          <View style={styles.progressLine} />
          <View style={[styles.progressLine, {backgroundColor: colors.GRAY}]} />
          <View style={[styles.progressLine, {backgroundColor: colors.GRAY}]} />
          <View style={[styles.progressLine, {backgroundColor: colors.GRAY}]} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    height: 270,
    width: '100%',
    position: 'absolute',
    top: 0,
    opacity: 0.1,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
  },
  image: {
    borderRadius: 50,
  },
  topview: {
    justifyContent: 'space-between',
  },
  welcomecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomemessage: {
    color: '#000',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 36,
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
    paddingBottom: 24,
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: units.width / 14,
    marginBottom: units.height / 30,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: units.height / 25,
  },
  progressLine: {
    height: 4,
    width: units.width / 5.3,
    backgroundColor: colors.GREEN,
    borderRadius: 20,
  },
});
