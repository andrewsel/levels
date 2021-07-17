import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colour, spacing, radius} from '../styles/styles';

const AverageBGLGraph = () => {
  return (
    <View style={s.container}>
      <View style={s.dot} />
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
    backgroundColor: colour.pink,
    height: 10,
    width: 10,
    borderRadius: radius.circular,
    marginLeft: 70,
  },
});

export default AverageBGLGraph;
