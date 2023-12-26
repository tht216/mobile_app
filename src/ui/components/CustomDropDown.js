import React, {useState} from 'react';
import {Animated, View, TouchableOpacity, Text} from 'react-native';

function CustomDropDown(props) {
  const [dropDownHeight, setDropDownHeight] = useState(new Animated.Value(0));
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    Animated.timing(dropDownHeight, {
      toValue: isDropDownOpen ? 0 : props.height,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <View style={props.style}>
      <TouchableOpacity onPress={toggleDropDown}>
        {props.title}
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            overflow: 'hidden',
            height: dropDownHeight,
          },
        ]}>
        {props.children}
      </Animated.View>
    </View>
  );
}

export default CustomDropDown;
