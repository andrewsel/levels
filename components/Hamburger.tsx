import React from 'react';

import {View, StyleSheet} from 'react-native';
import {colour} from '../styles/styles';

const Hamburger = () => {
  return (
    <View style={s.container}>
      <View style={s.line} />
      <View style={s.line} />
      <View style={s.line} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    display: 'flex',
    height: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  line: {
    backgroundColor: colour.smoke,
    height: 3,
    width: 22,
  },
});

export default Hamburger;
