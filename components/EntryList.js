import React from 'react';
import {View, FlatList} from 'react-native';
import Entry from './Entry';
import moment from 'moment';

const EntryList = ({entryList, insulinTypes}) => {
  const renderItem = ({item}) => (
    <Entry entry={item} insulinTypes={insulinTypes} />
  );

  return (
    <View>
      <FlatList
        data={entryList.sort((a, b) => moment(b.time).diff(a.time))}
        renderItem={renderItem}
        listKey="entries"
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default EntryList;
