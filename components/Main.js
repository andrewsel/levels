import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {colour} from '../styles/styles';
import Hamburger from './Hamburger';
import TimeInRangeGraph from './TimeInRangeGraph';
import AverageBGLGraph from './AverageBGLGraph';
import EntryList from './EntryList';
import {screens, bglTimeframes} from '../helpers/enums';

const Main = ({
  entryList,
  setScreen,
  timesInRange,
  averageBgls,
  insulinTypes,
  setSelectedEvent,
}) => {
  const [bglTimeframe, setBglTimeframe] = useState(bglTimeframes.ONE_DAY);

  return (
    <View style={s.screen}>
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
            <Text style={s.bigNumber}>
              {bglTimeframe === bglTimeframes.ONE_DAY
                ? timesInRange.oneDay
                : timesInRange.sevenDays}
              %
            </Text>
            {bglTimeframe === bglTimeframes.ONE_DAY && (
              <TimeInRangeGraph timeInRange={timesInRange.oneDay} />
            )}
            {bglTimeframe === bglTimeframes.SEVEN_DAYS && (
              <TimeInRangeGraph timeInRange={timesInRange.sevenDays} />
            )}
            <Text style={s.statLabel}>TIME IN RANGE</Text>
          </View>
          {bglTimeframe === bglTimeframes.ONE_DAY &&
            averageBgls.oneDay !== 'NaN' && (
              <View>
                <Text style={s.bigNumber}>{averageBgls.oneDay}</Text>
                <AverageBGLGraph averageBgl={averageBgls.oneDay} />
                <Text style={s.statLabel}>AVERAGE BGL</Text>
              </View>
            )}
          {bglTimeframe === bglTimeframes.SEVEN_DAYS && (
            <View>
              <Text style={s.bigNumber}>{averageBgls.sevenDays}</Text>
              <AverageBGLGraph averageBgl={averageBgls.sevenDays} />
              <Text style={s.statLabel}>AVERAGE BGL</Text>
            </View>
          )}
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
        <EntryList
          entryList={entryList}
          insulinTypes={insulinTypes}
          setSelectedEvent={setSelectedEvent}
          setScreen={setScreen}
        />
      </View>
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

export default Main;
