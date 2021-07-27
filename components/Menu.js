import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colour, spacing} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toggle from './Toggle';
import AppleHealthKit from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.BloodGlucose],
    write: [],
  },
};

const Menu = ({setScreen, appleHealthConnected, getBgls}) => {
  const handleSwitchOn = () => {
    console.log('Getting auth status');
    AppleHealthKit.getAuthStatus(permissions, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        console.log(results);
        if (results.permissions.read[0] > 0) {
          console.log('PERMISSIONS SET');
          getBgls();
        } else {
          console.log('Authing health kit');
          AppleHealthKit.initHealthKit(permissions, error => {
            if (error) {
              console.log('[ERROR] Cannot grant permissions!');
              console.log(error);
            } else {
              getBgls();
            }
          });
        }
      }
    });
  };

  return (
    <View style={s.screen}>
      <TouchableOpacity onPress={() => setScreen('MAIN')}>
        <Icon
          name="chevron-left"
          size={20}
          color={colour.grey300}
          onPress={() => setScreen('MAIN')}
        />
      </TouchableOpacity>
      <View style={s.avatarContainer}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>CS</Text>
        </View>
        <Text style={s.text}>Chloe Sellen</Text>
      </View>
      <View style={s.row}>
        <Text style={s.text}>Connect to health</Text>
        <Toggle
          onSwitchOn={handleSwitchOn}
          initialState={appleHealthConnected}
        />
      </View>
      <View style={s.row}>
        <Text style={s.text}>Insulin Types</Text>
        <Icon
          name="chevron-right"
          size={20}
          color={colour.grey300}
          onPress={() => setScreen('MAIN')}
        />
      </View>
      <View style={s.row}>
        <Text style={s.text}>Tags</Text>
        <Icon
          name="chevron-right"
          size={20}
          color={colour.grey300}
          onPress={() => setScreen('MAIN')}
        />
      </View>
      <View style={[s.row, s.lastRow]}>
        <Text style={[s.text, s.signOutText]}>Sign out</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
    paddingHorizontal: spacing,
    paddingVertical: 70,
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
    color: colour.smoke,
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    backgroundColor: colour.pink,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: colour.grey900,
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colour.smoke,
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  signOutText: {
    color: colour.red,
  },
});

export default Menu;
