import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {colour, spacing} from '../styles/styles';
import {bgls} from '../data/bgls';
import GraphHour from './GraphHour';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {graphEvents} from '../data/graphEvents';

const Graph = ({setScreen}) => {
  const startingHour = '2021-08-08T18:01:00.000Z';
  const numHoursToDisplay = 4;
  const hoursToDisplay = [];
  let hourToAdd = startingHour;
  for (let i = 0; i < numHoursToDisplay; i++) {
    hoursToDisplay.push(hourToAdd.slice(0, 13));
    hourToAdd = moment(hourToAdd).add(1, 'hour').toISOString(); //.slice(0, 13);
    // console.log(i + ': ' + hourToAdd);
  }

  const renderHours = hour => {
    return (
      <GraphHour
        bgls={bgls[hour]}
        graphEvents={graphEvents}
        hour={moment(hour).format('ha')}
        key={hour}
      />
    );
  };

  return (
    <View style={s.screen}>
      <View style={s.behindGraphContainer}>
        <ScrollView contentContainerStyle={s.graphContainer} horizontal={true}>
          {hoursToDisplay.map(hour => renderHours(hour))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setScreen('MAIN')}
          style={s.closeButton}>
          <Icon name="close" size={30} color={colour.grey300} />
        </TouchableOpacity>
      </View>
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
