import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import colours from './colours';

const Entry = () => {
  return (
    <View style={s.box}>
      <View style={s.container}>
        <View style={s.leftCol}>
          <Image style={s.image} source={require('./food.png')} />
        </View>
        <View style={s.rightCol}>
          <Text style={s.head}>Salmon and veg</Text>
          <Text style={s.desc}>
            Salmon, carrots, broccoli, 1 slice wonder white and half cup milk
          </Text>
        </View>
      </View>
      <View style={s.container}>
        <View style={s.leftCol}>
          <View style={s.novoBox}>
            <Text style={s.insulin}>Novo</Text>
          </View>
        </View>
        <View style={s.rightCol}>
          <Text style={s.head}>3.0 Units</Text>
        </View>
      </View>
      <View style={s.container}>
        <View style={s.leftCol}>
          <View style={s.actBox}>
            <Text style={s.insulin}>Actrapid</Text>
          </View>
        </View>
        <View style={s.rightCol}>
          <Text style={s.head}>1.5 Units</Text>
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
});

export default Entry;
