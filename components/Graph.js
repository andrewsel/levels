import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {colour, spacing} from '../styles/styles';
import {getBgls} from '../data/bgls';
import GraphHour from './GraphHour';
const bgls = getBgls();
const bglsByDate = {};

function getArrayPosition(x) {
  return Math.floor(x / 5);
}

bgls.map(bgl => {
  const hour = bgl.date.slice(0, 13);
  if (!bglsByDate[hour]) {
    bglsByDate[hour] = new Array(12).fill(0).map(() => null);
  }
  // Array is 24 values (1 per 5 mins)
  // Below rounds down to nearest 5 min increment
  // and returns array position
  const arrayPosition = getArrayPosition(bgl.date.slice(14, 16));
  bglsByDate[hour][arrayPosition] = bgl.level;
});

const Graph = ({setScreen}) => {
  // console.log(bglsByDate);

  return (
    <View style={s.screen}>
      <View style={s.behindGraphContainer}>
        <ScrollView contentContainerStyle={s.graphContainer} horizontal={true}>
          <GraphHour bgls={bglsByDate['2021-08-08T18']} hour={6} />
          <GraphHour bgls={bglsByDate['2021-08-08T19']} hour={7} />
          <GraphHour bgls={bglsByDate['2021-08-08T20']} hour={8} />
          <GraphHour bgls={bglsByDate['2021-08-08T21']} hour={9} />
          <GraphHour bgls={bglsByDate['2021-08-08T22']} hour={10} />
        </ScrollView>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
    // paddingHorizontal: spacing,
    // paddingVertical: 70,
  },
  behindGraphContainer: {
    backgroundColor: colour.black,
  },
  graphContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },
});

export default Graph;
