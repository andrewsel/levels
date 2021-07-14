import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colour, spacing, radius} from '../styles/styles';

const TimeInRangeGraph = () => {
  return (
    <View style={s.container}>
      <View style={s.line} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    height: spacing,
    width: 120,
    backgroundColor: colour.grey500,
    marginVertical: spacing,
    borderRadius: radius.circular,
  },
  line: {
    backgroundColor: colour.green,
    height: 10,
    width: 90,
    borderRadius: radius.circular,
  },
});

export default TimeInRangeGraph;
