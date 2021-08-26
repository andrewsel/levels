import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import {colour} from '../styles/styles';
import moment from 'moment';
import Entry from './Entry';
import SearchAndAdd from './SearchAndAdd';
import Stats from './Stats';
import {screens} from '../helpers/enums';

const Main = ({
  entryList,
  setScreen,
  timesInRange,
  averageBgls,
  insulinTypes,
  setSelectedEvent,
  bglTimeframe,
}) => {
  const [searchQ, setSearchQ] = useState('');
  const unfilteredList = entryList
    ? entryList.sort((a, b) => moment(b.time).diff(a.time))
    : [];
  const [filteredList, setFilteredList] = useState(unfilteredList);

  function onSearchQChange(text) {
    setSearchQ(text);
    // console.log(text);
    if (text.length > 2) {
      const matchList = [];
      entryList.map(e => {
        if (e.searchString && e.searchString.includes(text.toUpperCase())) {
          matchList.push(e);
        }
      });
      setFilteredList([unfilteredList[1], ...matchList]);
    } else {
      setFilteredList(unfilteredList);
    }
  }

  const renderItem = ({item}) => {
    return (
      <View>
        {item.id === 'stats' && (
          <Stats
            timesInRange={timesInRange}
            averageBgls={averageBgls}
            bglTimeframe={bglTimeframe}
          />
        )}
        {item.id === 'search' && (
          <SearchAndAdd
            searchQ={searchQ}
            onSearchQChange={onSearchQChange}
            showClearButton={searchQ.length > 0}
          />
        )}
        {item.id !== 'stats' && item.id !== 'search' && (
          <Pressable
            onPress={() => {
              setSelectedEvent(item.id);
              setScreen(screens.graph);
            }}>
            <Entry entry={item} insulinTypes={insulinTypes} />
          </Pressable>
          // <Text style={s.text}>Item</Text>
        )}
      </View>
    );
  };

  return (
    <FlatList
      style={s.screen}
      data={filteredList}
      renderItem={renderItem}
      listKey="entries"
      keyExtractor={item => item.id}
      stickyHeaderIndices={[1]}
    />
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.black,
    flex: 1,
  },
  text: {
    color: 'red',
  },
});

export default Main;
