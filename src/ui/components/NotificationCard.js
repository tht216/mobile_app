import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {units} from '../../themes/Units';
import {colors} from '../../themes/Colors';
import {Rating} from 'react-native-ratings';

const NotificationCard = ({item, onPress, rating}) => {
  return (
    <TouchableOpacity onPress={onPress} key={item._id} style={styles.container}>
      <Image
        source={{
          uri: 'https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-9660-1663317578.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=ZZ14jxe3Whlcw7PASlpBRA',
        }}
        borderRadius={20}
        style={styles.image}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item?.customerId._id.name}</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={{fontSize: 9, color: colors.GRAY}}>
            {item?.address}
          </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={{fontSize: 9, color: colors.GRAY}}>
            {item?.serviceType}
          </Text>
        </View>
        {rating && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Rating
              ratingCount={5}
              type="custom"
              readonly={true}
              imageSize={16}
              // ratingColor={colors.WHITE}
              // tintColor={colors.DARKORANGE}
              startingValue={item?.rating || 0}
              ratingBackgroundColor={colors.DARKGRAY}
              style={{backgroundColor: 'transparent'}}
            />
            <Text style={styles.ratingTxt}>{item?.rating || 0}</Text>
          </View>
        )}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {parseFloat(item?.price).toFixed(2)} $
          </Text>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{item?.amount} bag(s)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: units.width / 47,
    paddingVertical: units.height / 81,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.LIGHTGREY,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    marginHorizontal: units.width / 17,
    marginVertical: units.height / 150,
  },
  ratingTxt: {
    fontSize: 15,
    marginLeft: 5,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: colors.DARK,
    fontWeight: '600',
  },
  bodyContainer: {
    marginLeft: units.width / 17,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    marginTop: units.height / 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.DARK,
    marginHorizontal: units.width / 41,
  },
  image: {
    minHeight: units.height / 10,
    minWidth: units.width / 4.5,
  },
});
