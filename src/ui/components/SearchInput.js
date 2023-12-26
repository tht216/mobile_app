import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchInput = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={colors.DARKGRAY}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button}>
        <Icon name="magnify" size={25} color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARRWHITE,
    borderRadius: 10,
    paddingHorizontal: units.width / 21,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.DARKGRAY,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: units.height / 45,
  },
  button: {
    padding: 5,
    backgroundColor: colors.ORANGE,
    borderRadius: 50
  }
});
