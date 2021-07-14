import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour} from '../styles/styles';

interface CustomInputProps {
  onScreenChange: any;
}

const Tags = () => {
  return (
    <View style={s.pillContainer}>
      <View style={[s.pill, s.pillNew]}>
        <Text style={s.pillText}>+ NEW TAG</Text>
      </View>
      <View style={[s.pill]}>
        <Text style={s.pillText}>#Breakfast</Text>
      </View>
      <View style={[s.pill, s.pillSelected]}>
        <Text style={s.pillText}>#Lunch</Text>
      </View>
      <View style={[s.pill]}>
        <Text style={s.pillText}>#Dinner</Text>
      </View>
      <View style={[s.pill]}>
        <Text style={s.pillText}>#Low</Text>
      </View>
      <View style={[s.pill]}>
        <Text style={s.pillText}>#Correction</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  pillContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: colour.grey300,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 40,
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    color: colour.grey900,
    margin: 0,
    padding: 0,
    textTransform: 'uppercase',
  },
  pillNew: {
    backgroundColor: colour.grey200,
  },
  pillSelected: {
    backgroundColor: colour.purple,
  },
});

export default Tags;
