import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {colour, fontSize} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {v4 as uuid} from 'uuid';
const graphHeight = 200; // in px
const max = 19; // Max BGL graph will display

const GraphHour = ({
  bgls,
  graphEvents,
  day,
  hour,
  selectedEvent,
  setSelectedEvent,
  insulinTypes,
}) => {
  const graphEventCols = graphEvents;

  const renderDot = (bgl, index) => {
    // bgl = 2.0;
    let backgroundColor;
    if (bgl == null) {
      backgroundColor = colour.black;
    } else if (bgl < 4) {
      backgroundColor = colour.purple;
    } else if (bgl < 10) {
      backgroundColor = colour.green;
    } else {
      backgroundColor = colour.red;
    }
    const dotStyle = {
      marginTop: graphHeight - (bgl / max) * graphHeight,
      backgroundColor,
    };

    return <View style={[s.dot, dotStyle]} key={index} />;
  };

  const renderNote = (note, id) => {
    // console.log(id);
    return (
      <Pressable onPress={() => setSelectedEvent(id)} key={uuid()}>
        <View
          style={[s.event, s.noteEvent, selectedEvent === id ? s.outline : '']}>
          <Icon name="pencil" size={14} color={colour.black} />
        </View>
      </Pressable>
    );
  };

  const renderFood = (food, id) => {
    // console.log(id);
    return (
      <Pressable onPress={() => setSelectedEvent(id)} key={uuid()}>
        <View
          style={[s.event, s.foodEvent, selectedEvent === id ? s.outline : '']}>
          <Icon name="cutlery" size={14} color={colour.black} />
        </View>
      </Pressable>
    );
  };

  const renderInsulin = (insulin, id) => {
    // console.log(insulin);
    const insulinColour = {
      backgroundColor: insulinTypes[insulin.insulinId].insulinColour,
    };
    return (
      <Pressable onPress={() => setSelectedEvent(id)} key={uuid()}>
        <View
          style={[
            s.event,
            insulinColour,
            selectedEvent === id ? s.outline : '',
          ]}>
          <Text style={s.insulinNumber}>{insulin.insulinNumber}</Text>
        </View>
      </Pressable>
    );
  };

  const renderGraphEvent = (gE, index) => {
    // console.log(gE.id);
    console.log(gE);
    return (
      !gE.hidden && (
        <View key={uuid()}>
          <View>
            {gE.foods && gE.foods.map(f => renderFood(f, gE.id))}
            {gE.insulins && gE.insulins.map(i => renderInsulin(i, gE.id))}
            {gE.notes && gE.notes.map(n => renderNote(n, gE.id))}
          </View>
        </View>
      )
    );
    // return <View style={s.event} key={gE.id} />;
  };

  const renderGraphEventCol = (gE, index) => {
    return (
      <View style={s.eventsContainer} key={uuid()}>
        {gE.map((item, geIndex) => renderGraphEvent(item, geIndex))}
      </View>
    );
  };

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
  outline: {
    borderColor: colour.smoke,
    borderWidth: 1,
  },
  foodEvent: {
    backgroundColor: colour.grey400,
  },
  noteEvent: {
    backgroundColor: colour.salmon,
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
  insulinNumber: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default GraphHour;
