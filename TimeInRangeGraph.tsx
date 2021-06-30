import React from 'react';
import {View, StyleSheet} from 'react-native';
import colours from './colours';

const TimeInRangeGraph = () => {
  return (
    <View style={s.container}>
      <View style={s.line} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    height: 10,
    width: 120,
    backgroundColor: colours.grey,
    marginVertical: 10,
    borderRadius: 50,
  },
  line: {
    backgroundColor: colours.green,
    height: 10,
    width: 90,
    borderRadius: 50,
  },
});

export default TimeInRangeGraph;
