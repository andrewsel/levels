import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import colours from '../colours';

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
    backgroundColor: colours.darkgrey,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  leftCol: {
    width: 76,
  },
  rightCol: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 80,
  },
  image: {
    borderRadius: 4,
    width: 76,
    height: 76,
  },
  head: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.smoke,
    marginBottom: 4,
  },
  desc: {
    fontSize: 16,
    color: colours.smoke,
  },
  novoBox: {
    backgroundColor: colours.pink,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actBox: {
    backgroundColor: colours.bluegreen,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  insulin: {
    fontSize: 15,
    color: colours.black,
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: colours.black,
    padding: 10,
  },
  dateText: {
    color: colours.smoke,
  },
});

export default Entry;
