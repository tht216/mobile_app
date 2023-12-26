import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        borderRadius: 50,
        backgroundColor: colors.WHITE,
        elevation: 12,
        shadowColor: '#000',
      }}
      onPress={onPress}>
      <Icon name="arrow-back" size={27} color={colors.ORANGE} />
    </TouchableOpacity>
  );
};

export default BackButton;
