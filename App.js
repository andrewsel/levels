import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AppleHealthKit from 'react-native-health';
import {colour} from './styles/styles';
import Hamburger from './components/Hamburger';
import TimeInRangeGraph from './components/TimeInRangeGraph';
import AverageBGLGraph from './components/AverageBGLGraph';
import EntryList from './components/EntryList';
import Add from './components/Add';
import Menu from './components/Menu';
import moment from 'moment';

/*

TO DO
- Search
- Add tag
- Image resizing
- Graph page
- Avg bgl
- Time in Range
- Settings
-- Edit Insulin Types
-- Edit Tags


*/

const screens = {
  main: 'MAIN',
  add: 'ADD',
  menu: 'MENU',
};

const bglTimeframes = {
  ONE_DAY: 'oneDay',
  SEVEN_DAYS: 'sevenDays',
};

const App = () => {
  const [screen, setScreen] = useState(screens.main);
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [bgls, setBgls] = useState([]);
  const [averageBgls, setAverageBgls] = useState({});
  const [bglTimeframe, setBglTimeframe] = useState(bglTimeframes.ONE_DAY);
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
  const [entryList, setEntryList] = useState([
    // {
    //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   time: '2021-07-18T10:41:41.363Z',
    //   tags: ['dinner'],
    //   insulins: [
    //     {
    //       id: '983khjf98fad98',
    //       partType: parts.insulin,
    //       insulinNumber: 3.5,
    //       insulinId: 'cioaf9832',
    //     },
    //   ],
    //   foods: [
    //     {
    //       id: '983khjf9khja78fad98',
    //       partType: parts.food,
    //       title: 'Salmon',
    //       desc: 'Salmon and veg and stuff',
    //       image: '',
    //     },
    //   ],
    // },
    // {
    //   id: '12bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   time: '2021-07-20T10:41:41.363Z',
    // },
    // {
    //   id: '2bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   time: '2021-07-19T10:41:41.363Z',
    // },
  ]);

  // Get BGLs from Apple Health
  const getBgls = () => {
    // console.log('Getting BGLs');
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

  useEffect(() => {
    const getAverageBgls = () => {
      if (bgls && bgls.length > 0) {
        // console.log('getting average BGLs');
        let oneDayTotal = 0;
        let sevenDayTotal = 0;
        let oneDayValues = 0;
        let sevenDayValues = 0;
        const now = moment();
        const oneDayAgo = moment().subtract(1, 'days');
        const sevenDaysAgo = moment().subtract(7, 'days');
        bgls.map(b => {
          // console.log(moment(b.startDate).isBetween(now, oneDayAgo));
          if (moment(b.startDate).isBetween(oneDayAgo, now)) {
            oneDayTotal += b.value;
            oneDayValues += 1;
          }
          if (moment(b.startDate).isBetween(sevenDaysAgo, now)) {
            sevenDayTotal += b.value;
            sevenDayValues += 1;
          }
        });
        setAverageBgls({
          oneDay: (oneDayTotal / oneDayValues).toFixed(1),
          sevenDays: (sevenDayTotal / sevenDayValues).toFixed(1),
        });
      }
    };

    getAverageBgls();
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
      {screen === screens.main && (
        <View>
          <View style={s.header}>
            <View style={s.timeframeSelector}>
              <Pressable
                style={[
                  s.pill,
                  bglTimeframe === bglTimeframes.ONE_DAY ? s.selected : null,
                ]}
                onPress={() => setBglTimeframe(bglTimeframes.ONE_DAY)}>
                <Text style={s.pillText}>1 DAY</Text>
              </Pressable>
              <Pressable
                style={[
                  s.pill,
                  bglTimeframe === bglTimeframes.SEVEN_DAYS ? s.selected : null,
                ]}
                onPress={() => setBglTimeframe(bglTimeframes.SEVEN_DAYS)}>
                <Text style={s.pillText}>7 DAYS</Text>
              </Pressable>
            </View>
            <Hamburger onPress={() => setScreen(screens.menu)} />
          </View>
          <View style={s.stats}>
            <View>
              <Text style={s.bigNumber}>84%</Text>
              <TimeInRangeGraph />
              <Text style={s.statLabel}>TIME IN RANGE</Text>
            </View>
            <View>
              <Text style={s.bigNumber}>
                {bglTimeframe === bglTimeframes.ONE_DAY
                  ? averageBgls.oneDay
                  : averageBgls.sevenDays}
              </Text>
              {bglTimeframe === bglTimeframes.ONE_DAY && (
                <AverageBGLGraph averageBgl={averageBgls.oneDay} />
              )}
              {bglTimeframe === bglTimeframes.SEVEN_DAYS && (
                <AverageBGLGraph averageBgl={averageBgls.sevenDays} />
              )}
              <Text style={s.statLabel}>AVERAGE BGL</Text>
            </View>
          </View>
          <View style={s.searchAndAdd}>
            <View style={s.search}>
              <Text style={s.searchText}>Search</Text>
            </View>
            <View style={s.addCircle}>
              <Text style={s.plus} onPress={() => setScreen(screens.add)}>
                +
              </Text>
            </View>
          </View>
          <EntryList entryList={entryList} insulinTypes={insulinTypes} />
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.black,
    flex: 1,
  },
  header: {
    marginTop: 50,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    // display: 'none',
    padding: 10,
    backgroundColor: colour.grey900,
  },
  stats: {
    paddingHorizontal: 10,
    paddingVertical: 50,
    backgroundColor: colour.black,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 20,
    color: colour.smoke,
  },
  timeframeSelector: {
    display: 'flex',
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: colour.grey400,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 40,
    marginRight: 10,
    height: 26,
  },
  pillText: {
    fontSize: 14,
    color: colour.grey900,
    margin: 0,
    padding: 0,
  },
  selected: {
    backgroundColor: colour.purple,
  },
  bigNumber: {
    color: colour.smoke,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statLabel: {
    color: colour.smoke,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchAndAdd: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colour.grey900,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  search: {
    backgroundColor: colour.black,
    borderRadius: 40,
    height: 28,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: colour.grey300,
    marginLeft: 20,
  },
  addCircle: {
    height: 28,
    width: 28,
    backgroundColor: colour.grey200,
    borderRadius: 50,
    marginLeft: 10,
  },
  plus: {
    fontSize: 28,
    marginLeft: 6,
    marginTop: -4,
  },
});

export default App;
