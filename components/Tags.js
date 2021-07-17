import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour} from '../styles/styles';

const Tags = ({tags, setTags}) => {
  return (
    <View style={s.pillContainer}>
      <View style={[s.pill, s.pillNew]}>
        <Text style={s.pillText}>+ NEW TAG</Text>
      </View>
      {tags.map(([tag, selected]) => (
        <View style={selected ? [s.pill, s.pillSelected] : [s.pill]} key={tag}>
          <Text style={s.pillText}>#{tag}</Text>
        </View>
      ))}
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
