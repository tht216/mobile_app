import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useChangePickupStatusMutation,
  useHistoryPickupCompanyQuery,
} from '../../../utils/api';
import NotificationCard from '../../components/NotificationCard';
import {colors} from '../../../themes/Colors';
import {socket} from '../../../utils/socket';
import {useDispatch} from 'react-redux';
import {setDestination} from '../../../utils/userSlicer';
import {routes} from '../../../navigation/routes';
import {saveId} from '../../../utils/pickupSlice';

export default function Notification({navigation}) {
  const [activeCategory, setActiveCategory] = useState('Received');
  const [activeArray, setActiveArray] = useState([]);
  const [changePickupStatus] = useChangePickupStatusMutation();
  const dispatch = useDispatch();
  const {
    isLoading: isFetching,
    data: history,
    error: errorHistory,
    refetch,
  } = useHistoryPickupCompanyQuery();
  const filter = useMemo(() => {
    if (history.pickup) {
      setActiveArray(
        history.pickup.filter(value => value.status === activeCategory),
      );
    }
  }, [history.pickup]);
  const renderNotificationCard = ({item}) => (
    <NotificationCard
      item={item}
      rating={activeCategory === 'Done'}
      onPress={() => {
        console.log(item);
        dispatch(
          setDestination({
            name: item.address,
            coordinate: {
              latitude: item.lat, //10.771423,
              longitude: item.long, //106.698471, //
            },
            description: item.address,
          }),
        );
        dispatch(saveId(item._id));
        if (activeCategory === 'Received') {
          changePickupStatus({id: item._id, status: 'Pending'})
            .unwrap()
            .then(payload => navigation.navigate(routes.PENDING))
            .catch(error => console.log(error));
        }
      }}
    />
  );
  const renderEmptyCard = () => (
    <Text style={styles.emptyText}>Empty of List</Text>
  );
  useEffect(() => {
    function onNotificationEvent(value) {
      refetch();
    }
    socket.on('notification-count', onNotificationEvent);
    return () => {
      socket.off('notification-count');
    };
  }, [socket]);
  const fiterArray = item => {
    setActiveArray(history.pickup.filter(value => value.status === item));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topview}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Notification
        </Text>
      </View>
      <View style={styles.bottomview}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <TouchableOpacity
            onPress={() => {
              setActiveCategory('Received');
              fiterArray('Received');
            }}
            style={styles.categoriesContainer(activeCategory === 'Received')}>
            <Text style={styles.textCategories(activeCategory === 'Received')}>
              UPCOMING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveCategory('Done');
              fiterArray('Done');
            }}
            style={styles.categoriesContainer(activeCategory === 'Done')}>
            <Text style={styles.textCategories(activeCategory === 'Done')}>
              PAST
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={activeArray}
          renderItem={renderNotificationCard}
          keyExtractor={(_, index) => index.toString()}
          style={styles.list}
          ListEmptyComponent={renderEmptyCard}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  topview: {
    marginTop: 20,
    backgroundColor: colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomview: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 24,
  },
  textCategories: isActive => {
    const style = {
      fontWeight: '600',
      color: isActive ? colors.WHITE : colors.DARKGRAY,
    };
    return style;
  },
  categoriesContainer: isActive => {
    const style = {
      width: '50%',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginRight: 4,
      borderRadius: 50,
      boxShadow:
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      backgroundColor: isActive ? colors.LIGHTORANGE : 'rgba(0,0,0,0.07)',
    };
    return style;
  },
  emptyText: {
    color: colors.ORANGE,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  list: {
    padding: 0,
  },
});
