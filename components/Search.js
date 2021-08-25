import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {colour} from '../styles/styles';
import {screens} from '../helpers/enums';

const Search = ({setScreen, searchQ, onSearchQChange}) => {
  return (
    <View style={s.searchAndAdd}>
      <View style={s.search}>
        {/* <Text style={s.searchText}>Search</Text> */}
        <TextInput
          style={s.searchText}
          onChangeText={onSearchQChange}
          value={searchQ}
          placeholder="Search"
          placeholderTextColor={colour.grey200}
          keyboardType="default"
        />
      </View>
      <View style={s.addCircle}>
        <Text style={s.plus} onPress={() => setScreen(screens.add)}>
          +
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  searchAndAdd: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colour.grey900,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomColor: colour.black,
    borderBottomWidth: 1,
  },
  search: {
    backgroundColor: colour.black,
    borderRadius: 40,
    height: 28,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: colour.grey300,
    marginLeft: 20,
  },
  addCircle: {
    height: 28,
    width: 28,
    backgroundColor: colour.grey200,
    borderRadius: 50,
    marginLeft: 10,
  },
  plus: {
    fontSize: 28,
    marginLeft: 6,
    marginTop: -4,
  },
});

export default Search;
