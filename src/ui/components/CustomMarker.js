import React, {memo, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View, Text} from 'react-native';
import {Callout, Marker} from 'react-native-maps';
import {colors} from '../../themes/Colors';


const CustomMarker = memo(({index, marker, onMarkerPress}) => {
  

  return (
    <Marker
      key={index}
      title={marker.name}
      icon={{ uri: "https://imgur.com/scjKUVG.png" }}
      description={marker.description}
      coordinate={marker.coordinate}
      onPress={e => onMarkerPress(e)}>

      <Callout tooltip style={{width: 160}}>
        <View style={styles.calloutCard}>
          <Text style={styles.name}>{marker.name}</Text>
        </View>
        <View style={styles.triangle} />
      </Callout>
    </Marker>
  );
});

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.ORANGE,
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  calloutCard: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 6,
    padding: 5,
    width: 160,
  },
  name: {
    fontSize: 15,
    marginBottom: 2,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.65)',
    borderLeftColor: 'transparent',
    alignSelf: 'center',
    transform: [{rotate: '180deg'}],
    top: -2,
  },
});

export default CustomMarker;
