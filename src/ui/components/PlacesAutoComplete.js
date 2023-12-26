import {useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  FlatList,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {debounce as debounceFn} from 'lodash';
import Icon from 'react-native-vector-icons/Feather'
import tw from 'twrnc';
import {useSearchLocationMutation} from '../../utils/goongapi';

export const PlacesAutoComplete = ({
  onPress,
  onSearchClear,
  placeholder,
  containerStyle,
  inputStyle,
  iconStyle,
  placesStyle,
  debounce = 700,
  userLocation,
}) => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const debounceFindPlaces = useCallback(debounceFn(findPlaces, debounce), []);
  const [searchLocation] = useSearchLocationMutation();

  function findPlaces(text) {
    if (!text.trim()) {
      handleClearSearch();
      return;
    }
    searchLocation(text, userLocation ?? `0, 0}`)
      .unwrap()
      .then(payload => {
        const result = payload.predictions.map(data => {
          return {id: data.place_id, placeName: data.description};
        });
        setPlaces(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleClearSearch() {
    setSearch('');
    setPlaces([]);
    onSearchClear();
  }

  function onPlacePress(item) {
    setSearch(item.placeName);
    setPlaces([]);
    onPress(item);
  }

  function onSearchChange(text) {
    setSearch(text);
    debounceFindPlaces(text);
  }

  return (
    <View>
      <View style={[{flexDirection: 'row', alignItems: 'center',position: 'relative'}, containerStyle]}>
        <TextInput
          value={search}
          style={[tw`flex-1 text-lg p-3 pr-10`, inputStyle, {minHeight: 55}]}
          placeholder={placeholder}
          onChangeText={onSearchChange}
          selectionColor={'black'}
        />
        <Icon
          onPress={handleClearSearch}
          style={[
            tw`text-lg text-gray-300 absolute right-3 ${
              search ? 'opacity-100' : 'opacity-0'
            }`,
            iconStyle,
          ]}
          name="x-circle"
          size={23}
        />
      </View>

      {places.length > 0 && (
        <FlatList
          data={places}
          style={[placesStyle, tw`flex-grow h-25 pb-10`]}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={tw`flex-row py-3 border-b border-gray-100`}
              onPress={() => onPlacePress(item)}>
              <View style={tw`flex-1 py-1`}>
                <Text style={tw`text-black ml-2`}>{item.placeName}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
