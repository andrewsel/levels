import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {colour} from './styles/styles';
import Add from './components/Add';
import Menu from './components/Menu';
import {screens, bglTimeframes} from './helpers/enums';
import Main from './components/Main';
import Graph from './components/Graph';
import Loading from './components/Loading';
import Header from './components/Header';

const App = () => {
  const [screen, setScreen] = useState(screens.loading);
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [bgls, setBgls] = useState([]);
  const [averageBgls, setAverageBgls] = useState({});
  const [timesInRange, setTimesInRange] = useState({});
  const [insulinTypes, setInsulinTypes] = useState({
    uihasdf9a: {
      insulinName: 'Novo',
      insulinColour: colour.pink,
    },
    auwe9820: {
      insulinName: 'Actrapid',
      insulinColour: colour.blue,
    },
    cioaf9832: {
      insulinName: 'Fiasp',
      insulinColour: colour.green,
    },
    cijod8908a: {
      insulinName: 'Opti',
      insulinColour: colour.bluegreen,
    },
  });
  const [entryList, setEntryList] = useState([]);
  const [eventsByHour, setEventsByHour] = useState({});
  const [eventsById, setEventsById] = useState({});
  const [selectedEvent, setSelectedEvent] = useState('');
  const [bglTimeframe, setBglTimeframe] = useState(bglTimeframes.ONE_DAY);
  const [eventBeingEdited, setEventBeingEdited] = useState(false);
  const [selectedEventListIndex, setSelectedEventListIndex] = useState('');

  return (
    <View style={s.screen}>
      {screen === screens.loading && (
        <Loading
          setAppleHealthConnected={setAppleHealthConnected}
          setBgls={setBgls}
          setEventsById={setEventsById}
          setEventsByHour={setEventsByHour}
          setEventsList={setEntryList}
          setAverageBgls={setAverageBgls}
          setTimesInRange={setTimesInRange}
          setScreen={setScreen}
        />
      )}
      {screen === screens.add && (
        <Add
          setScreen={setScreen}
          setEntryList={setEntryList}
          entryList={entryList}
          insulinTypes={insulinTypes}
          eventsById={eventsById}
          setEventsById={setEventsById}
          eventsByHour={eventsByHour}
          setEventsByHour={setEventsByHour}
          eventBeingEdited={eventBeingEdited}
        />
      )}
      {screen === screens.menu && (
        <Menu
          setScreen={setScreen}
          appleHealthConnected={appleHealthConnected}
        />
      )}
      {screen === screens.graph && (
        <Graph
          setScreen={setScreen}
          bgls={bgls}
          eventsByHour={eventsByHour}
          eventsById={eventsById}
          insulinTypes={insulinTypes}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setEventsByHour={setEventsByHour}
          selectedEventListIndex={selectedEventListIndex}
          entryList={entryList}
          setEntryList={setEntryList}
        />
      )}
      {screen === screens.main && (
        <Header
          bglTimeframe={bglTimeframe}
          setBglTimeframe={setBglTimeframe}
          setScreen={setScreen}
        />
      )}
      {screen === screens.main && (
        <Main
          entryList={entryList}
          setEntryList={setEntryList}
          setScreen={setScreen}
          timesInRange={timesInRange}
          averageBgls={averageBgls}
          insulinTypes={insulinTypes}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          bglTimeframe={bglTimeframe}
          setEventBeingEdited={setEventBeingEdited}
          eventsByHour={eventsByHour}
          setEventsByHour={setEventsByHour}
          setSelectedEventListIndex={setSelectedEventListIndex}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.black,
    flex: 1,
  },
});

export default App;
