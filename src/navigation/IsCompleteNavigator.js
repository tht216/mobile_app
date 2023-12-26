import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './routes';
import PickUp from '../ui/screens/PickUp';

const Stack = createNativeStackNavigator();

const IsCompleteNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.ORDER} component={PickUp} />
    </Stack.Navigator>
  );
};

export default IsCompleteNavigator;
