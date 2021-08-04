import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour, spacing} from '../styles/styles';
import {bgls} from '../data/bgls';

const Graph = ({setScreen}) => {
  console.log(bgls);

  return (
    <View style={s.screen}>
      <View style={s.graphContainer}>
        <View style={s.hourContainer}>
          <Text style={s.hourText}>6pm</Text>
          <View style={s.dotsAndEventsContainer}>
            <View style={s.fifteenMinsContainer}>
              <View style={s.dotsContainer}>
                <View style={s.dot} />
                <View style={s.dot} />
                <View style={s.dot} />
              </View>
              <View style={s.eventsContainer}>
                <View style={s.eventSet}>
                  <View style={s.event} />
                  <View style={s.event} />
                  <View style={s.event} />
                </View>
              </View>
            </View>
            <View style={s.fifteenMinsContainer}>
              <View style={s.dotsContainer}>
                <View style={s.dot} />
                <View style={s.dot} />
                <View style={s.dot} />
              </View>
              <View style={s.eventsContainer}>
                <View style={s.eventSet}>
                  <View style={s.event} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
    paddingHorizontal: spacing,
    paddingVertical: 70,
  },
  graphContainer: {
    backgroundColor: colour.black,
  },
  hourContainer: {
    width: 96,
  },
  hourText: {
    fontSize: 16,
    marginVertical: 20,
    color: colour.smoke,
    textAlign: 'center',
  },
  dotsAndEventsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  fifteenMinsContainer: {
    width: 24,
  },
  dotsContainer: {
    height: 120,
    display: 'flex',
    flexDirection: 'row',
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: colour.green,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  eventsContainer: {
    width: 24,
    marginVertical: 8,
  },
  event: {
    width: 22,
    height: 22,
    backgroundColor: colour.purple,
    borderRadius: 20,
    marginVertical: 2,
  },
});

export default Graph;
