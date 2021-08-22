import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {colour} from './styles/styles';
import Add from './components/Add';
import Menu from './components/Menu';
import {screens} from './helpers/enums';
import Main from './components/Main';
import Graph from './components/Graph';
import Loading from './components/Loading';
import {entryListSample} from './data/entryList';

const App = () => {
  const [screen, setScreen] = useState(screens.loading);
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [bgls, setBgls] = useState([]);
  const [averageBgls, setAverageBgls] = useState({});
  const [timesInRange, setTimesInRange] = useState({});
  const [latestEntryFromAppleHealth, setLatestEntryFromAppleHealth] =
    useState('2015-01-01');
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
  const [entryList, setEntryList] = useState(entryListSample);
  const [events, setEvents] = useState({});

  /*
  TO DO
  - Make click on main event load graph at that time
  - Make serverless function save to DB and work for real
  */

  return (
    <View style={s.screen}>
      {screen === screens.loading && (
        <Loading
          setAppleHealthConnected={setAppleHealthConnected}
          setBgls={setBgls}
          setEvents={setEvents}
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
        />
      )}
      {screen === screens.menu && (
        <Menu
          setScreen={setScreen}
          appleHealthConnected={appleHealthConnected}
        />
      )}
      {screen === screens.graph && <Graph setScreen={setScreen} bgls={bgls} />}
      {screen === screens.main && (
        <Main
          entryList={entryList}
          setScreen={setScreen}
          timesInRange={timesInRange}
          averageBgls={averageBgls}
          insulinTypes={insulinTypes}
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
