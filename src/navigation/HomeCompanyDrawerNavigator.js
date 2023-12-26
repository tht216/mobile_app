import {routes} from './routes';
import {colors} from '../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, DrawerLayoutAndroid, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeCompany from '../ui/screens/HomeCompany';
import RegisterService from '../ui/screens/RegisterService';
import Notification from '../ui/screens/Notification';
import {socket} from '../utils/socket';
import {useEffect, useState, useMemo} from 'react';
import {
  useGetDetailCompanyQuery,
  useGetNotiQuery,
  useResetNotiMutation,
} from '../utils/api';
import PendingNavigator from './PendingNavigator';
import InformationNavigator from './InformationNavigator';
const Tab = createBottomTabNavigator();

export default HomeTabs = () => {
  const {data, error} = useGetDetailCompanyQuery();
  const {isLoading, data: notinumber, refetch} = useGetNotiQuery();
  const [notification, setNotification] = useState(0);
  const [resetNoti] = useResetNotiMutation();
  const filter = useMemo(() => {
    if (notinumber?.notification) {
      setNotification(notinumber.notification.number);
    }
  }, [notinumber?.notification]);
  const loginSocket = useMemo(() => {
    if (data?.data) {
      socket.emit('login', data?.data._id._id);
    }
  }, [data?.data]);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    function onNotificationEvent(value) {
      refetch();
    }
    socket.on('notification-count', onNotificationEvent);
    return () => {
      socket.off('notification-count');
    };
  }, [socket]);
  return (
    <Tab.Navigator
      initialRouteName={routes.HOMECOMPANY}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginBottom: 20,
          borderRadius: 50,
          marginHorizontal: 20,
          backgroundColor: colors.ORANGE,
          height: 70,
        },
      })}>
      <Tab.Screen
        name={routes.INFORMATION}
        component={InformationNavigator}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 50,
                  padding: 10,
                  backgroundColor: colors.WHITE,
                }}>
                <Icon name="create" color={colors.ORANGE} size={size} />
              </View>
            ) : (
              <Icon
                name="create-outline"
                color={colors.WHITE}
                size={30}
                strokeWidth={2}
              />
            ),
        }}
      />
      <Tab.Screen
        name={routes.HOMECOMPANY}
        component={HomeCompany}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 50,
                  padding: 10,
                  backgroundColor: colors.WHITE,
                }}>
                <Icon name="ios-home" color={colors.ORANGE} size={size} />
              </View>
            ) : (
              <Icon
                name="ios-home-outline"
                color={colors.WHITE}
                size={30}
                strokeWidth={2}
              />
            ),
        }}
      />
      <Tab.Screen
        name={routes.NOTIFICATION}
        component={Notification}
        listeners={{
          tabPress: e => {
            // Prevent default action
            resetNoti();
          },
        }}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  borderRadius: 50,
                  padding: 10,
                  backgroundColor: colors.WHITE,
                }}>
                <Icon name="notifications" color={colors.ORANGE} size={size} />
                {notification !== 0 && (
                  <View
                    style={{
                      backgroundColor: 'red',
                      position: 'absolute',
                      right: 0,
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: colors.WHITE,
                        paddingHorizontal: 2,
                        paddingVertical: 1,
                      }}>
                      {notification}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Icon
                  name="notifications-outline"
                  color={colors.WHITE}
                  size={30}
                  strokeWidth={2}
                />
                {notification !== 0 && (
                  <View
                    style={{
                      backgroundColor: 'red',
                      position: 'absolute',
                      right: 0,
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: colors.WHITE,
                        paddingHorizontal: 2,
                        paddingVertical: 1,
                      }}>
                      {notification}
                    </Text>
                  </View>
                )}
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};
