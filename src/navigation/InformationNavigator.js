import 'react-native-gesture-handler';

import React from 'react';
import {routes} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePassword from '../ui/screens/ChangePassword';
import RegisterService from '../ui/screens/RegisterService';
import Account from '../ui/screens/Account';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const InformationNavigator = () => {
  const isCompany = useSelector(selector => selector.userReduce.isCompany);

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
      }}>
      {isCompany ? (
        <Stack.Screen
          name={routes.SERVICE}
          options={{headerShown: false}}
          component={RegisterService}
        />
      ) : (
        <Stack.Screen
          name={routes.ACCOUNT}
          options={{headerShown: false}}
          component={Account}
        />
      )}
      <Stack.Screen
        name={routes.CHANGEPASSWORD}
        options={{headerShown: false}}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

export default InformationNavigator;
