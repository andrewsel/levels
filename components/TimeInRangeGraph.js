import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colour, spacing, radius} from '../styles/styles';

const TimeInRangeGraph = ({timeInRange = 0}) => {
  const lineWidth = {
    // width: (timeInRange * 120) / 100,
  };

  return (
    <View style={s.container}>
      <View style={[s.line, lineWidth]} />
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
    borderRadius: radius.circular,
  },
});

export default TimeInRangeGraph;
