import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Insulin = () => {
  return (
    <View style={s.insulinContainer}>
      <View style={s.insulinNumberContainer}>
        <Text style={s.insulinNumber}>2.5</Text>
      </View>
      <Text style={s.insulinText}>units of</Text>
      <View style={s.insulinNumberContainer}>
        <Text style={s.insulinNumber}>Actrapid</Text>
        <Icon
          name="caret-down"
          size={20}
          color={colour.smoke}
          style={s.caret}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  insulinContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: spacing,
    paddingVertical: spacing * 2,
    marginTop: spacing,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  insulinNumberContainer: {
    padding: spacing,
    backgroundColor: colour.grey900,
    borderRadius: radius.round,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  insulinNumber: {
    color: colour.smoke,
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
  insulinText: {
    color: colour.smoke,
    fontSize: fontSize.lg,
    marginHorizontal: spacing * 2,
  },
  caret: {
    marginLeft: spacing,
  },
});

export default Insulin;
