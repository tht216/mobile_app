import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {units} from '../../../themes/Units';
import {colors} from '../../../themes/Colors';
import {PlacesAutoComplete} from '../../components/PlacesAutoComplete';
import {useDispatch, useSelector} from 'react-redux';
import {Map} from '../../components/Maps';
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/CustomButton';
import {routes} from '../../../navigation/routes';
import {useGetPlaceDetailByIdMutation} from '../../../utils/goongapi';
import {setLocation} from '../../../utils/userSlicer';
import Loading from '../../components/Loading';
import {saveAddress, saveLat, saveLong} from '../../../utils/pickupSlice';
export default function Location({navigation}) {
  
  const [loading, setLoading] = useState(false);
  const location = useSelector(selector => selector.userReduce.location);
  const [getPlaceDetailById] = useGetPlaceDetailByIdMutation();
  const dispatch = useDispatch();
  
  const onClickBack = () => {
    navigation.goBack();
  };
  const nextStep = () => {
    navigation.navigate(routes.COMPANY);
    dispatch(saveAddress());
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <View style={{flex: 2}}>
        <Map style={styles.map} />
        <View style={styles.topBar}>
          <BackButton onPress={onClickBack} />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{flex: 1}}>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliverytext}>
              Where the collection will be made
            </Text>
            <Text style={styles.toText}>Choose your origin</Text>
          </View>
          <PlacesAutoComplete
            inputStyle={{
              borderColor: colors.BLACK,
              borderWidth: 1,
              paddingHorizontal: 4,
              marginVertical: 12,
              borderRadius: 24,
            }}
            placeholder="Where from?"
            onPress={place => {
              dispatch(saveAddress(place.placeName));
              setLoading(true),
                getPlaceDetailById(place.id)
                  .unwrap()
                  .then(payload => {
                    const locations = payload.result.geometry.location;
                    dispatch(setLocation(`${locations.lat}, ${locations.lng}`));
                    dispatch(saveLong(locations.lng));
                    dispatch(saveLat(locations.lat));
                    setLoading(false);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              console.log(place);
            }}
            onSearchClear={() => {}}
            userLocation={location}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton title="Next" onPress={nextStep} />
        <View style={styles.lineContainer}>
          <View style={styles.progressLine} />
          <View style={[styles.progressLine]} />
          <View style={[styles.progressLine, {backgroundColor: colors.GRAY}]} />
          <View style={[styles.progressLine, {backgroundColor: colors.GRAY}]} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: units.height / 2,
  },
  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
    paddingBottom: 24,
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: units.width / 14,
    marginBottom: units.height / 30,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: units.height / 25,
  },
  progressLine: {
    height: 4,
    width: units.width / 5.3,
    backgroundColor: colors.GREEN,
    borderRadius: 20,
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    left: units.width / 28,
    right: units.width / 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: units.height / 30,
  },
  deliverytext: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.DARK,
  },
  deliveryContainer: {
    alignItems: 'center',
  },
  toText: {
    fontSize: 12,
    color: colors.GRAY,
    marginTop: units.height / 135,
  },
});
