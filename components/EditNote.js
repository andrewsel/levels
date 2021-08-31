import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';

const EditNote = ({notes, setNotes, partIndex}) => {
  return (
    <View style={s.foodContainer}>
      <View style={s.titleAndDesc}>
        <TextInput
          style={s.foodDescription}
          multiline={true}
          onChangeText={d => {
            const newNotes = notes.slice();
            newNotes[partIndex] = d;
            setNotes(newNotes);
          }}
          value={notes[partIndex]}
          placeholder="Note"
          placeholderTextColor="#444"
          autoFocus={true}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  titleAndDesc: {
    width: 220,
  },
  foodTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.lg,
    color: colour.grey300,
    marginBottom: spacing * 2,
    paddingTop: 0,
  },
  foodDescription: {
    fontSize: fontSize.lg,
    color: colour.grey300,
  },
  foodContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: spacing,
    paddingVertical: spacing * 2,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 2,
  },
  imageContainer: {
    backgroundColor: colour.grey900,
    width: 100,
    height: 100,
    marginRight: spacing * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: radius.round,
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'black',
    // opacity: 1,
    borderRadius: 20,
    paddingHorizontal: spacing * 2,
    paddingTop: spacing * 4,
    paddingBottom: spacing * 6,
    alignItems: 'center',
  },
  modalButton: {
    borderRadius: 4,
    borderColor: colour.smoke,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: spacing,
    width: '100%',
  },
  modalButtonText: {
    color: colour.smoke,
    textAlign: 'center',
    fontSize: fontSize.lg,
  },
  modalButtonCancel: {
    borderWidth: 0,
  },
  modalButtonTextCancel: {
    color: colour.red,
    fontSize: fontSize.lg,
    marginTop: spacing,
  },
});

export default EditNote;
