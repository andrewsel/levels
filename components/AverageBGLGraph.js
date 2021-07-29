import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colour, spacing, radius} from '../styles/styles';

const AverageBGLGraph = ({averageBgl = 0}) => {
  // console.log(averageBgl);
  const dotPosition = (Math.min(averageBgl, 14) * 110) / 14;
  const dotColour = averageBgl > 9 ? colour.pink : colour.green;

  const dotOnGraph = {
    marginLeft: Number.isNaN(dotPosition) ? 55 : dotPosition,
    backgroundColor: dotColour,
  };

  return (
    <View style={s.container}>
      <View style={[s.dot, dotOnGraph]} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    height: spacing,
    width: 120,
    backgroundColor: colour.grey500,
    marginVertical: spacing,
    borderRadius: 50,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: radius.circular,
  },
});

export default AverageBGLGraph;
