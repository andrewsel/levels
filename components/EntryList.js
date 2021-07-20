import React from 'react';
import {View, FlatList} from 'react-native';
import Entry from './Entry';

const EntryList = ({entryList}) => {
  const renderItem = ({item}) => <Entry item={item} />;

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
