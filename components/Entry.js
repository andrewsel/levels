import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import moment from 'moment';

const Entry = ({entry, insulinTypes}) => {
  const renderFood = ({item}) => {
    return (
      <View style={s.container}>
        <View style={s.leftCol}>
          <Image
            style={s.image}
            source={{uri: 'data:image/png;base64,' + item.image}}
          />
        </View>
        <View style={s.rightCol}>
          <Text style={s.head}>{item.title}</Text>
          <Text style={s.desc}>{item.desc}</Text>
        </View>
      </View>
    );
  };

  const renderInsulin = ({item}) => {
    return (
      <View style={s.container}>
        <View style={s.leftCol}>
          <View
            style={[
              s.insulinBox,
              {backgroundColor: insulinTypes[item.insulinId].insulinColour},
            ]}>
            <Text style={s.insulin}>
              {insulinTypes[item.insulinId].insulinName}
            </Text>
          </View>
        </View>
        <View style={s.rightCol}>
          <Text style={s.head}>{item.insulinNumber} Units</Text>
        </View>
      </View>
    );
  };

  const renderNote = ({item}) => {
    console.log(item);
    return (
      <View style={s.container}>
        <View style={s.rightCol}>
          <Text style={s.desc}>{item.noteText}</Text>
        </View>
      </View>
    );
  };

  const renderTag = ({item}) => {
    return <Text style={s.tag}>#{item}</Text>;
  };

  return (
    <View>
      <View style={s.dateContainer}>
        <Text style={s.dateText}>
          {moment(entry.time).isBetween(
            moment().startOf('day').subtract(1, 'days'),
            moment().endOf('day'),
          )
            ? moment(entry.time).calendar()
            : moment(entry.time).format('ddd D MMM YYYY h:mm a')}
        </Text>
      </View>
      <View style={s.box}>
        <FlatList
          data={entry.foods}
          renderItem={renderFood}
          listKey={(f, index) => f.id + index.toString()}
        />
      </View>
      <View style={s.box}>
        <FlatList
          data={entry.notes}
          renderItem={renderNote}
          listKey={(n, index) => n.id + index.toString()}
        />
      </View>
      <View style={s.box}>
        <FlatList
          data={entry.insulins}
          renderItem={renderInsulin}
          listKey={(i, index) => i.id + index.toString()}
        />
      </View>
      <View style={s.box}>
        <View style={s.container}>
          <FlatList
            style={s.tagContainer}
            data={entry.tags}
            renderItem={renderTag}
            listKey={(t, index) => t.id + index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  box: {
    paddingBottom: 10,
    backgroundColor: colour.grey900,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: spacing,
    marginTop: spacing,
  },
  leftCol: {
    width: 76,
  },
  rightCol: {
    flexGrow: 1,
    paddingLeft: spacing,
    paddingRight: 80,
  },
  image: {
    borderRadius: radius.round,
    width: 76,
    height: 76,
  },
  head: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colour.smoke,
    marginBottom: 4,
  },
  desc: {
    fontSize: fontSize.lg,
    color: colour.smoke,
  },
  insulinBox: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actBox: {
    backgroundColor: colour.bluegreen,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  insulin: {
    fontSize: 15,
    color: colour.black,
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: colour.black,
    padding: spacing,
  },
  dateText: {
    color: colour.smoke,
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    color: colour.smoke,
    fontSize: 14,
    marginRight: spacing,
  },
});

export default Entry;
