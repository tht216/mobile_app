import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Map} from '../../components/Maps';
import {units} from '../../../themes/Units';
import {colors} from '../../../themes/Colors';
import BackButton from '../../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  useChangePickupStatusMutation,
  useGetPickupByIdQuery,
} from '../../../utils/api';
import {completeDeliveryPickup} from '../../../utils/pickupSlice';

export default function PendingPickup({navigation}) {
  const dispatch = useDispatch();
  const id = useSelector(selector => selector.pickupSlice.id);
  const {data, error} = useGetPickupByIdQuery({id});
  const [pickupDetail, setPickupDetail] = useState({});
  const [changePickupStatus] = useChangePickupStatusMutation();
  const filter = useMemo(() => {
    console.log({
      name: data?.data.customerId._id.name,
      phone: data?.data.customerId._id.phone,
      serviceType: data?.data.serviceType,
      amount: data?.data.amount,
    });
    setPickupDetail({
      name: data?.data.customerId._id.name,
      phone: data?.data.customerId._id.phone,
      serviceType: data?.data.serviceType,
      amount: data?.data.amount,
    });
  }, [data?.data]);
  const onClickBack = () => {
    changePickupStatus({id, status: 'Received'})
      .unwrap()
      .then(payload => navigation.goBack())
      .catch(error => console.log(error));
  };
  const onClickPhone = () => {
    Linking.openURL(`tel:${pickupDetail.phone}`);
  };
  const complete = () => {
    changePickupStatus({id, status: 'Done'})
      .unwrap()
      .then(payload => dispatch(completeDeliveryPickup()))
      .catch(error => console.log(error));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topBar}>
        <BackButton onPress={onClickBack} />
      </View>
      <View style={{flex: 1}}>
        <Map />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.bodyContainer}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliverytext}>
              Delivery to {pickupDetail.name}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.motorContaniner}>
              <Image
                source={require('../../../assets/images/motor.png')}
                style={{tintColor: colors.ORANGE}}
              />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>Delivering...</Text>
              <Text style={styles.detailSubTitle}>
                We pick up garbages in the shortest possible time.
              </Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.driverContainer}>
              <Image
                source={require('../../../assets/images/user.png')}
                style={{
                  width: units.width / 8,
                  height: units.width / 8,
                  borderRadius: 14,
                }}
              />
              <View style={{marginStart: units.width / 31}}>
                <Text style={styles.driverText}>{pickupDetail.name}</Text>
                <Text style={styles.driverStatus}>
                  {pickupDetail.serviceType} ({pickupDetail.amount} bags)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.phoneContainer}
              onPress={onClickPhone}>
              <Icon name="call" size={25} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <CustomButton title={'PICKUP COMPLETE'} onPress={complete} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    height: units.height / 4,
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
  title: {
    marginRight: 24,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {flex: 1, fontSize: 15},
  deliverytext: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.DARK,
  },
  deliveryContainer: {
    alignItems: 'center',
    marginTop: units.height / 30,
  },
  toText: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: units.height / 135,
  },
  progressLine: {
    height: 4,
    width: units.width / 5.3,
    backgroundColor: colors.GREEN,
    borderRadius: 20,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: units.height / 25,
  },
  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: units.width / 13,
    flex: 1,
    marginTop: units.height / -81,
    backgroundColor: colors.WHITE,
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 14,
    flexDirection: 'row',
    paddingVertical: units.height / 58,
    paddingHorizontal: units.width / 23,
    marginTop: units.height / 55,
  },
  motorContaniner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 12,
    paddingHorizontal: units.width / 25,
    paddingVertical: units.height / 54,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.DARK,
  },
  detailSubTitle: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: units.height / 102,
  },
  detailTextContainer: {
    flex: 1,
    marginStart: units.width / 31,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverText: {
    fontWeight: '600',
    color: colors.DARK,
  },
  driverStatus: {
    color: colors.GRAY,
    fontSize: 12,
    marginTop: units.height / 101,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: units.height / 41,
    justifyContent: 'space-between',
  },
  phoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 14,
    paddingHorizontal: units.width / 31,
    paddingVertical: units.height / 67,
    backgroundColor: colors.ORANGE,
  },
  markerContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: units.width / 47,
    paddingVertical: units.height / 101,
  },
});
