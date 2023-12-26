import * as React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

export const CustomCard = props => {
  return (
    <View style={[props.elevated && styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {width: 4, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 12,
  },
});
