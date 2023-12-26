import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {memo, useState} from 'react';
import {colors} from '../../themes/Colors';
import StatusIndicator from './StatusIndicator';
import {CustomCard} from './CustomCard';
import {Rating} from 'react-native-ratings';
import {useRatingPickupMutation} from '../../utils/api';
import Icon from 'react-native-vector-icons/Ionicons';
import {units} from '../../themes/Units';

const {width} = Dimensions.get('screen');

export default PickUpCard = memo(
  ({data, rating}) => {
    const [star, setStar] = useState(0);
    const [ratingPickup] = useRatingPickupMutation();
    console.log(data.rating);
    const ratingCompleted = rating => {
      setStar(rating);
      Alert.alert(
        'Confirmation',
        `Are you sure to rate this pickup ${rating} star(s)`,
        [
          {
            text: 'Cancel',
            onPress: () => setStar(0),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              ratingPickup({id: data._id, rating})
                .unwrap()
                .then(payload => console.log(payload))
                .catch(error => console.log(error)),
          },
        ],
      );
    };
    const onClickPhone = () => {
      Linking.openURL(`tel:${data?.companyId._id.phone}`);
    };
    return (
      <View style={{marginBottom: 12}}>
        <View
          style={{
            height: 180,
            width: 120,
            marginBottom: -140,
            borderRadius: 24,
            zIndex: 10,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.22,
            shadowRadius: 9.22,
            elevation: 12,
          }}>
          <Image
            source={{
              uri: 'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
            }}
            style={styles.icon}
          />
        </View>
        <CustomCard elevated={true} style={styles.card}>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text numberOfLines={1} style={styles.mainText}>
                {data?.companyId._id.name}
              </Text>
              <View style={styles.infoRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      color: colors.WHITE,
                      marginHorizontal: 10,
                    }}>
                    {data?.serviceType.toLocaleUpperCase()}
                  </Text>
                  <StatusIndicator status={data?.status.toLocaleUpperCase()} />
                </View>
                {rating && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Rating
                      key={star}
                      ratingCount={5}
                      type="custom"
                      readonly={data?.rating}
                      onFinishRating={ratingCompleted}
                      startingValue={data?.rating || star}
                      imageSize={16}
                      ratingColor={colors.WHITE}
                      tintColor={colors.DARKORANGE}
                      ratingBackgroundColor={colors.DARKGRAY}
                      style={{backgroundColor: 'transparent'}}
                    />
                    <Text style={styles.ratingTxt}>{data?.rating || star}</Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginTop: 12,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      borderRightWidth: 1,
                      borderColor: colors.WHITE,
                    }}>
                    <Text style={styles.text}>Amount</Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.text, {fontWeight: 'bold'}]}>
                      {data?.amount}
                    </Text>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 12}}>
                    <Text style={styles.text}>Price</Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.text, {fontWeight: 'bold'}]}>
                      ${data?.price}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoRow}>
                {!rating && (
                  <TouchableOpacity
                    style={styles.phoneContainer}
                    onPress={onClickPhone}>
                    <Icon name="call" size={25} color={colors.WHITE} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </CustomCard>
      </View>
    );
  },
  (prev, next) => prev.data.id === next.data.id,
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.DARKORANGE,
    marginLeft: 24,
    padding: 12,
    paddingLeft: 100,
    borderRadius: 24,
  },
  icon: {
    height: 180,
    width: 120,
    borderRadius: 24,
    zIndex: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    marginVertical: 5,
  },
  infoRow: {
    overflow: 'hidden',
  },
  mainText: {
    color: colors.WHITE,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  subText: {
    color: colors.WHITE,
    fontWeight: '800',
    fontSize: 16,
    marginHorizontal: 10,
  },
  ratingTxt: {
    fontSize: 15,
    marginLeft: 5,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  viewContainer: {justifyContent: 'center', marginHorizontal: 5},
  viewText: {color: colors.WHITE, fontSize: 22, fontWeight: 'bold'},
  phoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 14,
    paddingHorizontal: units.width / 31,
    paddingVertical: units.height / 67,
    backgroundColor: colors.ORANGE,
    marginTop: 12,
  },
});
