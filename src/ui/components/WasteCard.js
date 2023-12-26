import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {BoxShadow} from 'react-native-shadow';
export default function WasteCard({item}) {
  return (
    <View
      style={{
        borderRadius: 40,
        backgroundColor: colors.DARKORANGE,
        height: 300,
        width: 250,
        marginTop: 65,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -17,
        },

        shadowOpacity: 0.25,
        shadowRadius: 18.97,
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: -64,
        }}>
        <View
          style={{
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 12,
            height: 160,
            width: 160,
            borderRadius: 99,
          }}>
          <Image
            source={item.image}
            style={{
              height: 160,
              width: 160,
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <Text
          style={{
            fontSize: 30,
            lineHeight: 36,
            color: colors.WHITE,
            fontWeight: '600',
            zIndex: 10,
            textAlign: 'center',
          }}>
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              marginTop: 12,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 24,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
            className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
            <Text
              style={{fontSize: 16, fontWeight: '600', color: colors.WHITE}}
              className="text-base font-semibold text-white">
              {item.label}
            </Text>
          </View>
        </View>

        <View
          style={{
            shadowColor: colors.DARKORANGE,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
          className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={item.onPress}
            style={{
              padding: 16,
              backgroundColor: colors.WHITE,
              borderRadius: 50,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5.62,
              elevation: 12,
            }}
            className="p-4 bg-white rounded-full">
            <Icon
              name="add"
              size={25}
              strokeWidth={2}
              color={colors.DARKORANGE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
