import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import {colour} from './styles/styles';
import Hamburger from './components/Hamburger';
import TimeInRangeGraph from './components/TimeInRangeGraph';
import AverageBGLGraph from './components/AverageBGLGraph';
import EntryList from './components/EntryList';
import Add from './components/Add';

/*

TO DO

- Render tags
- Edit note
- Render note
- Sort entry list by date
- Search
- Add tag
- Image resizing
- Graph page
- Settings
-- Import data from Health
-- Edit Insulin Types
-- Edit Tags


*/

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.BloodGlucose],
    write: [],
  },
};

const screens = {
  main: 'MAIN',
  add: 'ADD',
};

const parts = {
  food: 'FOOD',
  insulin: 'INSULIN',
  note: 'NOTE',
};

const App = () => {
  const [screen, setScreen] = useState(screens.main);
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
  ]);

  const handlePressAuthHealthKit = () => {
    console.log('Authing health kit');
    AppleHealthKit.initHealthKit(permissions, error => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
        console.log(error);
      }
    });
  };

  const handlePressGetAuthStatus = () => {
    console.log('Getting auth status');
    AppleHealthKit.getAuthStatus(permissions, (err, results) => {
      console.log(err, results);
    });
  };

  const handlePressGetBGLs = () => {
    console.log('Getting BGLs');
    let options = {
      // unit: 'mmolPerL', // optional; default 'mmolPerL'
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    };
    AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
      if (err) {
        return;
      }
      console.log(results);
    });
  };

  // const handleScreenChange = newScreen => {
  //   setScreen(newScreen);
  // };

  // const handleSaveEntry = details => {
  //   console.log(details);
  // };

  return (
    <View style={s.screen}>
      {screen === 'ADD' && (
        <Add
          setScreen={setScreen}
          setEntryList={setEntryList}
          entryList={entryList}
          insulinTypes={insulinTypes}
        />
      )}
      {screen === 'MAIN' && (
        <View>
          <View style={s.header}>
            <View style={s.timeframeSelector}>
              <View style={[s.pill]}>
                <Text style={s.pillText}>1 DAY</Text>
              </View>
              <View style={[s.pill, s.grey]}>
                <Text style={s.pillText}>7 DAYS</Text>
              </View>
            </View>
            <Hamburger />
          </View>
          <View style={s.stats}>
            <View>
              <Text style={s.bigNumber}>84%</Text>
              <TimeInRangeGraph />
              <Text style={s.statLabel}>TIME IN RANGE</Text>
            </View>
            <View>
              <Text style={s.bigNumber}>7.2</Text>
              <AverageBGLGraph />
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

          <View style={s.container}>
            <Text style={s.text} onPress={handlePressAuthHealthKit}>
              Auth Health Kit2
            </Text>
            <Text style={s.text} onPress={handlePressGetAuthStatus}>
              Check Auth Status
            </Text>
            <Text style={s.text} onPress={handlePressGetBGLs}>
              Get BGLs
            </Text>
          </View>
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
    display: 'none',
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
    backgroundColor: colour.purple,
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
  grey: {
    backgroundColor: colour.grey400,
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
