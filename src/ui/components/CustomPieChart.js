import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';

export default function CustomPieChart({array}) {
  const [pieItem, setPieItem] = useState({});
  return (
    <View>
      <PieChart
        strokeWidth={2}
        strokeColor="#fff"
        data={array}
        donut
        radius={90}
        innerRadius={60}
        innerCircleColor={'#232B5D'}
        onLabelPress={value => console.log(value)}
        onPress={(item, index) => {
          setPieItem(item);
          console.log(item);
        }}
        centerLabelComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {pieItem?.value}
              </Text>
              <Text style={{fontSize: 14, color: 'white'}}>
                {pieItem?.title}
              </Text>
            </View>
          );
        }}
      />
      {array.map((value, i) => (
        <View
          key={i}
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: value.color,
              marginRight: 10,
            }}
          />
          <Text>
            {value.title}: {value.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
