export const GOONG_API_KEY = 'zGzzh9DlBQ3uiVT6Inro2wkW5nKWTSdgGKjbufkJ';
export const API_URL = 'http://10.10.20.155:3000/api/v1';
import {Dimensions, Platform} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const {width} = Dimensions.get('window');

export const OUTER_CARD_HEIGHT = 170;
export const OUTER_CARD_WIDTH = width;

export const INNER_CARD_HEIGHT = 160;
export const INNER_CARD_WIDTH = width * 0.8;

export const categories = [
  {
    id: 1,
    title: 'Organic',
  },
  {
    id: 2,
    title: 'Plastic',
  },
  {
    id: 3,
    title: 'Paper',
  },
  {
    id: 4,
    title: 'Metal',
  },
  {
    id: 5,
    title: 'Glass',
  },
  {
    id: 6,
    title: 'E-Waste',
  },
  {
    id: 7,
    title: 'Hazardous',
  },
];

export const wasteItems = [
  {
    id: 1,
    name: 'Organic',
    label: 'organic',
    image: require('../assets/images/organic.png'),
    desc: 'Food scraps, yard waste, and other biodegradable materials.',
    onPress: () => {},
  },

  {
    id: 2,
    name: 'Plastic',
    label: 'recycle',
    image: require('../assets/images/plastic.png'),
    desc: 'This includes any discarded plastic material, such as bags, bottles, and packaging. Plastic waste is a major environmental concern because it can take hundreds of years to decompose and can harm wildlife.',
    onPress: () => {},
  },

  {
    id: 3,
    name: 'Paper',
    label: 'recycle',
    image: require('../assets/images/paper.png'),
    desc: 'This includes any discarded paper material, such as newspapers, magazines, and cardboard boxes. Paper waste can also be recycled and reused, which helps to conserve natural resources and reduce landfill space.',
  },

  {
    id: 4,
    name: 'Metal',
    label: 'recycle',
    image: require('../assets/images/metal.png'),
    desc: 'This includes any discarded metal object, such as aluminum cans, steel scrap, and appliances. Metal waste can be recycled and reused, which is beneficial for the environment and can save energy.',
    onPress: () => {},
  },

  {
    id: 5,
    name: 'Glass',
    label: 'recycle',
    image: require('../assets/images/glass.png'),
    desc: 'This includes any discarded glass material, such as bottles and jars. Glass waste can also be recycled and reused, which is beneficial for the environment and can save energy.',
    onPress: () => {},
  },

  {
    id: 6,
    name: 'E-waste',
    label: 'e-waste',
    image: require('../assets/images/e-waste.png'),
    desc: 'Electronic waste, such as computers, televisions, and cell phones.',
    onPress: () => {},
  },
  {
    id: 7,
    name: 'Hazardous',
    label: 'hazardous',
    image: require('../assets/images/harzadous.png'),
    desc: 'Products that are potentially dangerous to human health or the environment, such as batteries, cleaning agents, and pesticides.',
    onPress: () => {},
  },
];

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 10;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select({
  android:
    Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
  ios: Dimensions.get('window').height,
});

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

// Control Button like Flash
export const CONTROL_BUTTON_SIZE = 40;
