import React from 'react';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {colour, radius} from '../styles/styles';
import {screens} from '../helpers/enums';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchAndAdd = ({
  setScreen,
  searchQ,
  onSearchQChange,
  showClearButton,
}) => {
  const clearButton = {display: showClearButton ? 'flex' : 'none'};

  return (
    <View style={s.searchAndAdd}>
      <View style={s.search}>
        <TextInput
          style={s.searchText}
          onChangeText={text => onSearchQChange(text)}
          value={searchQ}
          placeholder="Search"
          placeholderTextColor={colour.grey400}
          keyboardType="default"
        />
        <Pressable
          style={[s.clear, clearButton]}
          onPress={() => onSearchQChange('')}>
          <Icon name="close" size={14} color={colour.black} />
        </Pressable>
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
    justifyContent: 'space-between',
  },
  searchText: {
    color: colour.grey200,
    marginLeft: 20,
    maxWidth: 200,
  },
  clear: {
    marginRight: 10,
    height: 18,
    width: 18,
    backgroundColor: colour.pink,
    borderRadius: radius.circular,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default SearchAndAdd;
