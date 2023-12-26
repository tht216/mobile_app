import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './store';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableLatestRenderer} from 'react-native-maps';
import {Camera} from 'react-native-vision-camera';
import {StyleSheet} from 'react-native';
import {DevicesPage} from './src/ui/screens/DevicesPage';
import {PermissionsPage} from './src/ui/screens/PermissionPage';
import {MediaPage} from './src/ui/screens/MediaPage';
import {CameraPage} from './src/ui/screens/CameraPage';
import {CodeScannerPage} from './src/ui/screens/CodeScannerPage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  enableLatestRenderer();
  const cameraPermission = Camera.getCameraPermissionStatus();
  const microphonePermission = Camera.getMicrophonePermissionStatus();

  const showPermissionsPage =
    cameraPermission !== 'granted' || microphonePermission === 'not-determined';
  // return (
  //   <Provider store={store}>
  //     <AppNavigator />
  //     <FlashMessage position="top" />
  //   </Provider>
  // );
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.root}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            animationTypeForReplace: 'push',
          }}
          initialRouteName={
            showPermissionsPage ? 'PermissionsPage' : 'CameraPage'
          }>
          <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
          <Stack.Screen name="CameraPage" component={CameraPage} />
          <Stack.Screen name="CodeScannerPage" component={CodeScannerPage} />
          <Stack.Screen
            name="MediaPage"
            component={MediaPage}
            options={{
              animation: 'none',
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen name="Devices" component={DevicesPage} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
