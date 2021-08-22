import React from 'react';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Entry from './Entry';
import moment from 'moment';
import {screens} from '../helpers/enums';

const EntryList = ({entryList, insulinTypes, setSelectedEvent, setScreen}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedEvent(item.id);
        setScreen(screens.graph);
      }}>
      <Entry entry={item} insulinTypes={insulinTypes} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={entryList.sort((a, b) => moment(b.time).diff(a.time))}
      renderItem={renderItem}
      listKey="entries"
      keyExtractor={item => item.id}
    />
  );
};

export default EntryList;
