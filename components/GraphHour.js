import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colour} from '../styles/styles';

const GraphHour = ({bgls, hour}) => {
  // console.log(bgls);

  const renderDot = (bgl, index) => {
    // console.log(bgl);
    // max = 0mT = 20BGL, min = 114mT = 2.0BGL
    const max = 17;
    const dotStyle = {
      marginTop: 114 - (bgl / max) * 114,
      backgroundColor:
        bgl < 4 ? colour.purple : bgl > 10 ? colour.red : colour.green,
    };

    return <View style={[s.dot, dotStyle]} key={index} />;
  };

  return (
    <View style={s.hourContainer}>
      <Text style={s.hourText}>{hour}pm</Text>
      <View style={s.dotsAndEventsContainer}>
        <View style={[s.line, s.high]} />
        <View style={[s.line, s.low]} />
        <View style={s.fifteenMinsContainer}>
          <View style={s.dotsContainer}>
            {bgls.map((bgl, index) => renderDot(bgl, index))}
          </View>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colour.grey500,
    position: 'absolute',
  },
  high: {
    top: 114 - (10 / 17) * 114 + 3,
  },
  low: {
    top: 114 - (3.9 / 17) * 114 + 3,
  },
});

export default GraphHour;
