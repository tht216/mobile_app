import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';

const StatusIndicator = ({status}) => {
  const selectStatusColor = status => {
    switch (status) {
      case 'RECEIVED':
        return colors.GRAY;
      case 'PENDING':
        return colors.YELLOW;
      case 'DONE':
        return colors.GREEN;
      default:
        return 'red';
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: selectStatusColor(status)}]}>
        {status}
      </Text>
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: selectStatusColor(status),
          },
        ]}
      />
    </View>
  );
};

export default StatusIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.LIGHTGREY,
    fontSize: 16,
    marginLeft: 10,

  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
});
