import React from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colour} from '../styles/styles';

const Hamburger = ({onPress}) => {
  return (
    <TouchableOpacity style={s.container} onPress={onPress}>
      <View style={s.line} />
      <View style={s.line} />
      <View style={s.line} />
    </TouchableOpacity>
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
