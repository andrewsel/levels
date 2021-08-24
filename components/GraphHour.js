import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colour} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {v4 as uuid} from 'uuid';
const graphHeight = 200; // in px
const max = 19; // Max BGL graph will display

const renderDot = (bgl, index) => {
  // bgl = 2.0;
  const dotStyle = {
    marginTop: graphHeight - (bgl / max) * graphHeight,
    backgroundColor:
      bgl < 4 ? colour.purple : bgl > 10 ? colour.red : colour.green,
  };

  return <View style={[s.dot, dotStyle]} key={index} />;
};

const renderFood = food => {
  return (
    <View style={[s.event, s.foodEvent]} key={food.id}>
      <Icon name="cutlery" size={14} color={colour.black} />
    </View>
  );
};

const renderInsulin = insulin => {
  // console.log(insulin);
  return (
    <View style={[s.event]} key={insulin.id}>
      <Text>{insulin.insulinNumber}</Text>
    </View>
  );
};

const renderGraphEvent = (gE, index) => {
  // console.log(gE);
  return (
    <View key={uuid}>
      {gE.foods && gE.foods.map(f => renderFood(f))}
      {gE.insulins && gE.insulins.map(i => renderInsulin(i))}
    </View>
  );
  // return <View style={s.event} key={gE.id} />;
};

const renderGraphEventCol = (gE, index) => {
  return (
    <View style={s.eventsContainer} key={uuid}>
      {gE.map((item, geIndex) => renderGraphEvent(item, geIndex))}
    </View>
  );
};

const GraphHour = ({bgls, graphEvents, day, hour}) => {
  const graphEventCols = graphEvents;
  return (
    <View style={s.hourContainer}>
      <Text style={s.monthText}>{day}</Text>
      <Text style={s.hourText}>{hour}</Text>
      <View style={s.dotsAndEventsContainer}>
        <View>
          <View style={[s.line, s.high]} />
          <View style={[s.line, s.low]} />

          <View style={s.dotsContainer}>
            {bgls && bgls.map((bgl, index) => renderDot(bgl, index))}
          </View>
          <View style={s.eventColsContainer}>
            {graphEventCols &&
              graphEventCols.map((gE, index) => renderGraphEventCol(gE, index))}
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
  monthText: {
    fontSize: 16,
    marginTop: 20,
    color: colour.purple,
    textAlign: 'left',
  },
  hourText: {
    fontSize: 16,
    marginVertical: 12,
    color: colour.smoke,
    textAlign: 'left',
  },
  dotsAndEventsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: -50,
  },
  fifteenMinsContainer: {
    width: 24,
  },
  dotsContainer: {
    height: graphHeight + 6,
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
  eventColsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  eventsContainer: {
    width: 24,
  },
  event: {
    width: 22,
    height: 22,
    backgroundColor: colour.purple,
    borderRadius: 20,
    marginVertical: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEvent: {
    backgroundColor: colour.grey400,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colour.grey500,
    position: 'absolute',
  },
  high: {
    top: graphHeight - (10 / max) * graphHeight + 3,
  },
  low: {
    top: graphHeight - (3.9 / max) * graphHeight + 3,
  },
});

export default GraphHour;
