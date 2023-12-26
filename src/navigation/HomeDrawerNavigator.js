import {routes} from './routes';
import History from '../ui/screens/History';
import {colors} from '../themes/Colors';
import Home from '../ui/screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, DrawerLayoutAndroid, Text, Image} from 'react-native';
import Account from '../ui/screens/Account';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {units} from '../themes/Units';
import CustomButton from '../ui/components/CustomButton';
import {useDispatch} from 'react-redux';
import {logOutAccount} from '../utils/userSlicer';
import InformationNavigator from './InformationNavigator';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeDrawerNavigator = () => {
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Drawer.Screen name={routes.HOMEDRAWER} component={Home} />
  </Drawer.Navigator>;
};
const drawerContent = () => {
  const dispatch = useDispatch();
  const onClickMenu = () => {
    dispatch(logOutAccount());
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.ORANGE,
          paddingHorizontal: 8,
        }}></View>
      <View
        style={{
          flex: 5,
          paddingHorizontal: 8,
          paddingBottom: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: -units.width / 6,
            width: units.width / 3,
            height: units.width / 3,
            borderRadius: 999,
          }}>
          <Image
            style={{
              width: units.width / 3,
              height: units.width / 3,
              borderRadius: 999,
            }}
            source={require('../assets/images/profilePhoto.png')}
          />
        </View>
        <CustomButton
          onPress={onClickMenu}
          title={'Log out'}
          style={{width: '100%'}}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
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
        name={routes.HISTORY}
        component={History}
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
                <Icon name="time" color={colors.ORANGE} size={size} />
              </View>
            ) : (
              <Icon
                name="time-outline"
                color={colors.WHITE}
                size={30}
                strokeWidth={2}
              />
            ),
        }}
      />
      <Tab.Screen
        name={routes.HOME}
        component={Home}
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
                <Icon name="person" color={colors.ORANGE} size={size} />
              </View>
            ) : (
              <Icon
                name="person-outline"
                color={colors.WHITE}
                size={30}
                strokeWidth={2}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
