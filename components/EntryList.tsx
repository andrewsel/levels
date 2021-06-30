import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entry from './Entry';
import colours from '../colours';

const EntryList = () => {
  return (
    <View>
      <View style={s.dateContainer}>
        <Text style={s.dateText}>YESTERDAY AT 6:06PM</Text>
      </View>
      <Entry />
      <View style={s.dateContainer}>
        <Text style={s.dateText}>TUESDAY AT 6:18PM</Text>
      </View>
      <Entry />
    </View>
  );
};

const s = StyleSheet.create({
  dateContainer: {
    backgroundColor: colours.black,
    padding: 10,
  },
  dateText: {
    color: colours.smoke,
  },
});

export default EntryList;
