import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colour} from '../styles/styles';

const Menu = ({setScreen}) => {
  return (
    <View style={s.screen}>
      <Text style={s.text}>MENU</Text>
      <TouchableOpacity onPress={() => setScreen('MAIN')}>
        <Text style={s.text}>Close Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
    color: colour.smoke,
  },
});

export default Menu;
