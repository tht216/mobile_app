import 'react-native-gesture-handler';

import React, {useEffect, useMemo} from 'react';
import {routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CurrentLocation from '../ui/screens/CurrentLocation';
import ChooseAmount from '../ui/screens/ChooseAmount';
import Location from '../ui/screens/Location';
import Company from '../ui/screens/Company';
import Checkout from '../ui/screens/Checkout';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import {socket} from '../utils/socket';
import {useGetDetailQuery} from '../utils/api';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const HomeNavigator = () => {
  const {isLoading, data, error} = useGetDetailQuery();
  const filter = useMemo(() => {
    if (data?.data) {
      socket.emit('login', data?.data.data._id);
    }
  }, [data?.data]);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name={routes.HOMETAB}
        options={{headerShown: false}}
        component={HomeDrawerNavigator}
      />
      <Stack.Screen
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
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
