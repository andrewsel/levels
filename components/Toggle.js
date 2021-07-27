import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {colour} from '../styles/styles';

const Toggle = ({
  onSwitchOn = () => {},
  onSwitchOff = () => {},
  initialState,
}) => {
  const [on, setOn] = useState(initialState);

  const handleSwitch = () => {
    if (on) {
      onSwitchOff();
      setOn(false);
    } else {
      onSwitchOn();
      setOn(true);
    }
  };

  return (
    <Pressable
      style={[s.container, on ? s.containerOn : s.containerOff]}
      onPress={() => handleSwitch()}>
      <View style={[s.circle, on ? s.circleOn : s.circleOff]} />
    </Pressable>
  );
};

const height = 24;
const padding = 3;

const s = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colour.grey400,
    borderRadius: 40,
    height: height,
    width: 46,

    borderWidth: 1,
  },
  containerOn: {
    justifyContent: 'flex-end',
    borderColor: colour.green,
  },
  containerOff: {
    justifyContent: 'flex-start',
    borderColor: colour.grey200,
  },
  circle: {
    height: height - padding * 2,
    width: height - padding * 2,
    borderRadius: 40,
    marginHorizontal: padding,
  },
  circleOn: {
    backgroundColor: colour.green,
  },
  circleOff: {
    backgroundColor: colour.grey200,
  },
});

export default Toggle;
