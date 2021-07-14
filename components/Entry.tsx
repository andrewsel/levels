import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';

const Entry = ({item}: {item: any}) => {
  return (
    <View>
      <View style={s.dateContainer}>
        <Text style={s.dateText}>{item.time}</Text>
      </View>
      <View style={s.box}>
        <View style={s.container}>
          <View style={s.leftCol}>
            <Image style={s.image} source={{uri: item.image}} />
          </View>
          <View style={s.rightCol}>
            <Text style={s.head}>{item.head}</Text>
            <Text style={s.desc}>{item.desc}</Text>
          </View>
        </View>
        <View style={s.container}>
          <View style={s.leftCol}>
            <View style={s.novoBox}>
              <Text style={s.insulin}>Novo</Text>
            </View>
          </View>
          <View style={s.rightCol}>
            <Text style={s.head}>{item.novo} Units</Text>
          </View>
        </View>
        <View style={s.container}>
          <View style={s.leftCol}>
            <View style={s.actBox}>
              <Text style={s.insulin}>Actrapid</Text>
            </View>
          </View>
          <View style={s.rightCol}>
            <Text style={s.head}>{item.actrapid} Units</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  box: {
    paddingBottom: 10,
    backgroundColor: colour.grey900,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: spacing,
    marginTop: spacing,
  },
  leftCol: {
    width: 76,
  },
  rightCol: {
    flexGrow: 1,
    paddingLeft: spacing,
    paddingRight: 80,
  },
  image: {
    borderRadius: radius.round,
    width: 76,
    height: 76,
  },
  head: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colour.smoke,
    marginBottom: 4,
  },
  desc: {
    fontSize: fontSize.lg,
    color: colour.smoke,
  },
  novoBox: {
    backgroundColor: colour.pink,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actBox: {
    backgroundColor: colour.bluegreen,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  insulin: {
    fontSize: 15,
    color: colour.black,
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: colour.black,
    padding: spacing,
  },
  dateText: {
    color: colour.smoke,
  },
});

export default Entry;
