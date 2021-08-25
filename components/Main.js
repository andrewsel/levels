import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {colour} from '../styles/styles';
import moment from 'moment';
import Entry from './Entry';
import Search from './Search';
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
          <Search searchQ={searchQ} setSearchQ={setSearchQ} />
        )}
        {item.id !== 'stats' && item.id !== 'search' && (
          <TouchableOpacity
            onPress={() => {
              setSelectedEvent(item.id);
              setScreen(screens.graph);
            }}>
            <Entry entry={item} insulinTypes={insulinTypes} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <FlatList
      style={s.screen}
      data={entryList && entryList.sort((a, b) => moment(b.time).diff(a.time))}
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
});

export default Main;
