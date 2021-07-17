import React from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {colour} from '../styles/styles';

const Tags = ({tags, setTags}) => {
  const handleClick = i => {
    const newTags = [...tags];
    newTags[i][1] = !newTags[i][1];
    setTags(newTags);
  };

  return (
    <ScrollView contentContainerStyle={s.pillContainer} horizontal={true}>
      <View style={[s.pill, s.pillNew]}>
        <Text style={s.pillText}>+ NEW TAG</Text>
      </View>
      {tags.map(([tag, selected], index) => (
        <Pressable
          style={selected ? [s.pill, s.pillSelected] : [s.pill]}
          key={tag}
          onPress={() => handleClick(index)}>
          <Text style={s.pillText}>#{tag}</Text>
        </Pressable>
      ))}
    </ScrollView>
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
