import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import IsCompleteNavigator from './IsCompleteNavigator';
import HomeCompanyNavigator from './HomeCompanyNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLogin = useSelector(selector => selector.userReduce.isLogin);
  const isCompany = useSelector(selector => selector.userReduce.isCompany);
  const isDone = useSelector(selector => selector.pickupSlice.isDone);

  return (
    <NavigationContainer>
      {isDone ? (
        <IsCompleteNavigator />
      ) : isLogin ? (
        isCompany ? (
          <HomeCompanyNavigator />
        ) : (
          <HomeNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
