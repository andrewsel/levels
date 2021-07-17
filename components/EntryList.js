import React from 'react';
import {View, FlatList} from 'react-native';
import Entry from './Entry';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    time: 'Today at 6:06PM',
    head: 'Salmon and veg',
    desc: 'Salmon, carrots, broccoli, 1 slice wonder white and half cup milk',
    image:
      'https://thishealthytable.com/wp-content/uploads/2021/05/furikake-salmon-5-of-5.jpg',
    novo: 3,
    actrapid: 1.5,
  },
  {
    id: 'ad7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    time: 'Yesterday at 6:26PM',
    head: 'Pizza',
    desc: '2 slices thin crispy dominos. 1 garlic bread. Veges.',
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/17/10/0d/0f/hot-and-spicy.jpg',
    novo: 1.5,
    actrapid: 4,
  },
];

const EntryList = () => {
  const renderItem = ({item}) => <Entry item={item} />;

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default EntryList;
