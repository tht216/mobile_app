import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../themes/Colors';

export const FromTo = ({from, to}) => {
  return (
    <View style={{width: '100%'}}>
      <View
        style={{flexDirection: 'row', marginBottom: 15, alignItems: 'center'}}>
        <Icon name="location-sharp" size={26} color={colors.LIGHTORANGE} />
        <View style={{marginLeft: 20}}>
          <Text style={{opacity: 0.6, fontSize: 15}}>From</Text>
          <Text
            numberOfLines={2}
            style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
            {from}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 12,
          height: 28,
          borderWidth: 1,
          top: 42,
          width: 0,
          borderColor: '#EBE7E6',
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopStartRadius: 60,
          borderTopEndRadius: 20,
          borderColor: '#EBE7E6',
          borderTopWidth: 2,
        }}>
        <Icon name="location-sharp" size={26} color={colors.ORANGE} />
        <View style={{marginLeft: 20}}>
          <Text style={{opacity: 0.6, fontSize: 15, marginTop: 10}}>To</Text>
          <Text
            numberOfLines={2}
            style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
            {to}
          </Text>
        </View>
      </View>
    </View>
  );
};
