import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colour, spacing} from '../styles/styles';
// import {bgls} from '../data/bgls';
import GraphHour from './GraphHour';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// import {graphEvents} from '../data/graphEvents';
import Entry from './Entry';
import {v4 as uuid} from 'uuid';

const Graph = ({
  bgls,
  setScreen,
  eventsByHour,
  eventsById,
  insulinTypes,
  selectedEvent,
  setSelectedEvent,
}) => {
  // console.log(bgls);
  // console.log('eventsById');
  // console.log(eventsById);
  console.log(eventsByHour);
  console.log('Selected Event: ' + selectedEvent);
  // const startingHour = moment(eventsById[selectedEvent].time).toISOString();
  const startingHour = moment().subtract(3, 'months');
  const hourPosition = moment(eventsById[selectedEvent].time)
    .add(10, 'hours')
    .diff(startingHour, 'hours');
  // console.log('HOUR POSITION: ' + hourPosition);
  const numHoursToDisplay = 24 * 94;
  const hoursToDisplay = [];
  let hourToAdd = startingHour;
  for (let i = 0; i < numHoursToDisplay; i++) {
    hoursToDisplay.push(hourToAdd.toISOString().slice(0, 13));
    hourToAdd = moment(hourToAdd).add(1, 'hour'); //.slice(0, 13);
    // console.log(i + ': ' + hourToAdd);
  }

  const renderHour = ({item}) => {
    // console.log(item);
    const hourFormatted = moment(item).format('ha');

    return (
      <GraphHour
        bgls={bgls[item]}
        // graphEvents={eventsByHour[item]}
        day={hourFormatted === '12am' ? moment(item).format('D MMM') : ' '}
        hour={hourFormatted}
      />
    );
  };

  return (
    <View style={s.screen}>
      <View style={s.behindGraphContainer}>
        <FlatList
          style={s.graphContainer}
          horizontal={true}
          data={hoursToDisplay}
          renderItem={renderHour}
          listKey={'graphHours'}
          keyExtractor={i => i}
          initialScrollIndex={hourPosition}
          getItemLayout={(data, index) => ({
            length: 96,
            offset: 96 * index,
            index,
          })}
        />
        <TouchableOpacity
          onPress={() => setScreen('MAIN')}
          style={s.closeButton}>
          <Icon name="close" size={30} color={colour.grey300} />
        </TouchableOpacity>
      </View>
      {selectedEvent && (
        <Entry entry={eventsById[selectedEvent]} insulinTypes={insulinTypes} />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
  },
  behindGraphContainer: {
    backgroundColor: colour.black,
  },
  graphContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    paddingRight: spacing * 2,
    top: 74,
    right: 0,
    width: 60,
    height: 30,
    backgroundColor: colour.black,
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default Graph;
