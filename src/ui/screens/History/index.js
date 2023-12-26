import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import PickUpCard from '../../components/PickUpCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import {useHistoryPickupQuery} from '../../../utils/api';
import Loading from '../../components/Loading';
const {height} = Dimensions.get('screen');

const CardsTray = ({characters}) => {
  const {isLoading, data, error} = useHistoryPickupQuery();
  const renderItem = ({item}) => (
    <PickUpCard data={item} rating={activeCategory === 'Done'} />
  );
  const [activeCategory, setActiveCategory] = useState('Received');
  const [activeArray, setActiveArray] = useState([]);
  const filterArray = field => {
    setActiveArray(data.pickup.filter(value => value.status === field));
  };
  const filter = useMemo(() => {
    if (data?.pickup) {
      filterArray(activeCategory);
    }
  }, [data?.pickup]);
  const keyExtractor = useCallback(item => `${item._id}`, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loading />}
      <View style={styles.topview}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Your Pickup
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
              filterArray('Received');
            }}
            style={styles.categoriesContainer(activeCategory === 'Received')}>
            <Text style={styles.textCategories(activeCategory === 'Received')}>
              Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveCategory('Pending');
              filterArray('Pending');
            }}
            style={styles.categoriesContainer(activeCategory === 'Pending')}>
            <Text style={styles.textCategories(activeCategory === 'Pending')}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveCategory('Done');
              filterArray('Done');
            }}
            style={styles.categoriesContainer(activeCategory === 'Done')}>
            <Text style={styles.textCategories(activeCategory === 'Done')}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            // stickyHeaderIndices={[0]} // Note: Avoiding sticky headers, not performant for 60fps
            data={activeArray}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            windowSize={height}
            initialNumToRender={10}
            removeClippedSubviews={true}
            ListEmptyComponent={
              <Text
                style={{textAlign: 'center', fontWeight: '600', marginTop: 24}}>
                Empty List
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardsTray;

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
});
