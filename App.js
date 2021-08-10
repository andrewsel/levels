import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AppleHealthKit from 'react-native-health';
import {colour} from './styles/styles';
import Add from './components/Add';
import Menu from './components/Menu';
import moment from 'moment';
import {screens} from './helpers/enums';
import Main from './components/Main';
import Graph from './components/Graph';
import {entryListSample} from './data/entryList';

/*
TO DO
- Search
- Graph page
- Settings
-- Edit Insulin Types
-- Edit Tags
*/

const App = () => {
  const [screen, setScreen] = useState(screens.graph);
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
  const [entryList, setEntryList] = useState(entryListSample);

  // Get BGLs from Apple Health
  const getBgls = () => {
    let options = {
      startDate: new Date(2021, 0, 0).toISOString(),
    };
    AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      setBgls(results);
      setAppleHealthConnected(true);
    });
  };

  // On mount
  useEffect(() => {
    getBgls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Average BGLs and Time in range when BGLs change
  useEffect(() => {
    const getAverageBglsAndTimeInRange = () => {
      if (bgls && bgls.length > 0) {
        let oneDayTotal = 0;
        let sevenDayTotal = 0;
        let oneDayValues = 0;
        let sevenDayValues = 0;
        let oneDayInRangeVals = 0;
        let sevenDayInRangeVals = 0;
        const now = moment();
        const oneDayAgo = moment().subtract(1, 'days');
        const sevenDaysAgo = moment().subtract(7, 'days');
        bgls.map(b => {
          // console.log(moment(b.startDate).isBetween(now, oneDayAgo));
          if (moment(b.startDate).isBetween(oneDayAgo, now)) {
            oneDayTotal += b.value;
            oneDayValues += 1;
            if (b.value > 3.9 && b.value < 10) {
              oneDayInRangeVals += 1;
            }
          }
          if (moment(b.startDate).isBetween(sevenDaysAgo, now)) {
            sevenDayTotal += b.value;
            sevenDayValues += 1;
            if (b.value > 3.9 && b.value < 10) {
              sevenDayInRangeVals += 1;
            }
          }
        });
        setAverageBgls({
          oneDay: (oneDayTotal / oneDayValues).toFixed(1),
          sevenDays: (sevenDayTotal / sevenDayValues).toFixed(1),
        });
        setTimesInRange({
          oneDay:
            oneDayValues === 0
              ? 100
              : ((oneDayInRangeVals / oneDayValues) * 100).toFixed(0),
          sevenDays:
            sevenDayValues === 0
              ? 100
              : ((sevenDayInRangeVals / sevenDayValues) * 100).toFixed(0),
        });
      }
    };

    getAverageBglsAndTimeInRange();
  }, [bgls]);

  return (
    <View style={s.screen}>
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
          getBgls={getBgls}
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
