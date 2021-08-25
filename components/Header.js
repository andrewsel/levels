import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {colour} from '../styles/styles';
import Hamburger from './Hamburger';
import {screens, bglTimeframes} from '../helpers/enums';

const Header = ({bglTimeframe, setBglTimeframe, setScreen}) => (
  <View style={s.headerContainer}>
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
  </View>
);

const s = StyleSheet.create({
  headerContainer: {
    backgroundColor: colour.black,
  },
  header: {
    marginTop: 40,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default Header;
