import 'react-native-gesture-handler';

import React from 'react';
import {routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notification from '../ui/screens/Notification';
import PendingPickup from '../ui/screens/PendingPickup';
const Stack = createNativeStackNavigator();
const PendingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      contentStyle: {backgroundColor: 'white'},
    }}>
    <Stack.Screen
      name={routes.NOTIFICATION}
      options={{headerShown: false}}
      component={Notification}
    />
    <Stack.Screen
      name={routes.PENDING}
      options={{headerShown: false}}
      component={PendingPickup}
    />
  </Stack.Navigator>
);


export default PendingNavigator;
