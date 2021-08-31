import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, FlatList, Pressable} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import {screens} from '../helpers/enums';
const axios = require('axios');

const Entry = ({
  entry,
  insulinTypes,
  editable = false,
  setScreen,
  selectedEvent,
  setSelectedEvent,
  setEventBeingEdited,
  entryList,
  setEntryList,
  eventsByHour,
  setEventsByHour,
  selectedEventListIndex,
}) => {
  const renderFood = ({item}) => {
    return (
      <View style={s.container}>
        <View style={s.leftCol}>
          {!item.image && (
            <View style={s.image}>
              <Icon name="cutlery" size={40} color={colour.grey400} />
            </View>
          )}
          {item.image && (
            <Image
              style={s.image}
              source={{uri: 'data:image/png;base64,' + item.image}}
            />
          )}
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
    // console.log(item);
    return (
      <View style={s.container}>
        <View style={s.leftCol}>
          {!item.image && (
            <View style={s.image}>
              <Icon name="pencil" size={40} color={colour.grey400} />
            </View>
          )}
          {item.image && (
            <Image
              style={s.image}
              source={{uri: 'data:image/png;base64,' + item.image}}
            />
          )}
        </View>
        <View style={s.rightCol}>
          <Text style={s.desc}>{item}</Text>
        </View>
      </View>
    );
  };

  const renderTag = ({item}) => {
    return <Text style={s.tag}>#{item}</Text>;
  };

  const handleEdit = () => {
    console.log(entry.id);
    setEventBeingEdited(entry.id);
    setScreen(screens.add);
  };

  const handleDelete = async () => {
    console.log(entry.id);

    // remove from list
    console.log('eventListIndex: ' + selectedEventListIndex);
    const updatedEntryList = [...entryList];
    updatedEntryList.splice(selectedEventListIndex, 1);
    // const updatedEntryList = entryList.splice(selectedEventListIndex, 1);
    setEntryList(updatedEntryList);

    // remove from by hour
    const hour = entry.time.slice(0, 13);
    const minutes = entry.time.slice(14, 16);
    const position = Math.floor(minutes / 15);
    console.log('eventsByHour[hour]:');
    console.log(eventsByHour[hour]);
    const updatedHour = eventsByHour[hour]
      ? eventsByHour[hour]
      : [[], [], [], []];
    for (let i = 0; i < updatedHour[position].length; i++) {
      if (updatedHour[position][i].id === entry.id) {
        updatedHour[position][i].hidden = true;
      }
    }

    // hide
    entry.hidden = true;

    setEventsByHour({...eventsByHour, ...updatedHour});

    // Delete from DB
    try {
      await axios.post(
        'https://f5mgf9nw47.execute-api.ap-southeast-2.amazonaws.com/prod/delete',
        {
          eventId: entry.id,
        },
        {},
      );
    } catch (error) {
      console.error(error);
    }

    console.log('Event deleted');
  };

  return (
    !entry.hidden && (
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
            listKey={uuid()}
            keyExtractor={(f, index) => f.id + index.toString()}
          />
        </View>
        <View style={s.box}>
          <FlatList
            data={entry.notes}
            renderItem={renderNote}
            listKey={uuid()}
            keyExtractor={(n, index) => n.id + index.toString()}
          />
        </View>
        <View style={s.box}>
          <FlatList
            data={entry.insulins}
            renderItem={renderInsulin}
            listKey={uuid()}
            keyExtractor={(i, index) => i.id + index.toString()}
          />
        </View>
        <View style={s.box}>
          <View style={s.container}>
            <FlatList
              style={s.tagContainer}
              data={entry.tags}
              renderItem={renderTag}
              listKey={uuid()}
              keyExtractor={tag => tag}
            />
          </View>
        </View>
        <View style={s.box}>
          <View style={[s.container, s.buttons]}>
            <Pressable onPress={handleEdit}>
              <Text style={s.editButton}>Edit</Text>
            </Pressable>
            <Pressable onPress={handleDelete}>
              <Text style={s.deleteButton}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colour.black,
  },
  head: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colour.smoke,
    marginBottom: 4,
  },
  desc: {
    fontSize: fontSize.md,
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    color: colour.red,
    marginLeft: 16,
    textTransform: 'uppercase',
  },
  editButton: {
    color: colour.smoke,
    textTransform: 'uppercase',
  },
});

export default Entry;
