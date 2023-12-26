import 'react-native-gesture-handler';

import React from 'react';
import {routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import HomeCompanyDrawerNavigator from './HomeCompanyDrawerNavigator';
import Notification from '../ui/screens/Notification';
import PendingPickup from '../ui/screens/PendingPickup';
// import MarketNavigator from './MarketNavigator';
// import ProfileNavigator from './ProfileNavigator';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const HomeCompanyNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      contentStyle: {backgroundColor: 'white'},
    }}>
    <Stack.Screen
      name={routes.HOMETABCOMPANY}
      options={{headerShown: false}}
      component={HomeCompanyDrawerNavigator}
    />
    <Stack.Screen
      name={routes.PENDING}
      options={{headerShown: false}}
      component={PendingPickup}
    />
    {/* <Stack.Screen
      name={routes.CURRENTLOCATION}
      options={{headerShown: false}}
      component={CurrentLocation}
    />
    <Stack.Screen
      name={routes.AMOUNT}
      options={{headerShown: false}}
      component={ChooseAmount}
    />
    <Stack.Screen
      name={routes.LOCATION}
      options={{headerShown: false}}
      component={Location}
    />
    <Stack.Screen
      name={routes.COMPANY}
      options={{headerShown: false}}
      component={Company}
    />
    <Stack.Screen
      name={routes.CHECKOUT}
      options={{headerShown: false}}
      component={Checkout}
    /> */}
  </Stack.Navigator>
);

export default HomeCompanyNavigator;
