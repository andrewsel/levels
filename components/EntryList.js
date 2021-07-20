import React from 'react';
import {View, FlatList} from 'react-native';
import Entry from './Entry';

const EntryList = ({entryList, insulinTypes}) => {
  const renderItem = ({item}) => (
    <Entry entry={item} insulinTypes={insulinTypes} />
  );

  return (
    <View>
      <FlatList
        data={entryList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default EntryList;
