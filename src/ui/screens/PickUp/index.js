import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {nextPickup} from '../../../utils/pickupSlice';

export default function PickUp() {
  const dispatch = useDispatch();
  const {isComplete} = useSelector(selector => selector.pickupSlice);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <LottieView
        style={styles.Animationstyle}
        source={require('../../../assets/animation/success.json')}
        autoPlay
        speed={0.5}
        loop={false}
      />
      <>
        {/* Conditionally Rendering Text in Order Tab */}
        <Text style={styles.AnimationTextstyle}>
          {isComplete
            ? 'The Pick Up has been delivered Successfully'
            : 'Your Pick Up has been booked Successfully'}
        </Text>
      </>
      <CustomButton
        title="Return Home"
        onPress={() => {
          dispatch(nextPickup());
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  Animationstyle: {
    height: 120,
    alignSelf: 'center',
  },
  AnimationTextstyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 30,
    fontSize: 21,
    fontFamily: 'Roboto',
  },
  MenuItemContainerStyle: {
    paddingHorizontal: 10,
  },
  MenuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    alignItems: 'center',
  },
  FoodInfoContainerStyle: {
    width: '50%',
    justifyContent: 'space-evenly',
  },
  FoodTitleStyle: {
    fontSize: 17,
    fontWeight: '600',
  },
});
