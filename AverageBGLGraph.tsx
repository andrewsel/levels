import React from 'react';
import {View, StyleSheet} from 'react-native';
import colours from './colours';

const AverageBGLGraph = () => {
  return (
    <View style={s.container}>
      <View style={s.dot} />
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
  dot: {
    backgroundColor: colours.pink,
    height: 10,
    width: 10,
    borderRadius: 50,
    marginLeft: 70,
  },
});

export default AverageBGLGraph;
