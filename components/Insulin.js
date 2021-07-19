import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const insulinNames = ['Novo', 'Actrapid', 'Fiasp'];

const Insulin = () => {
  const [units, setUnits] = useState(null);
  const [insulinType, setInsulinType] = useState('Select');
  const [modalVisible, setModalVisible] = useState(false);

  const renderInsulinTypes = ({item}) => {
    return (
      <Pressable style={s.modalButton}>
        <Text
          style={s.modalButtonText}
          onPress={() => {
            setInsulinType(item);
            setModalVisible(false);
          }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={s.insulinContainer}>
      <View style={s.insulinNumberContainer}>
        <TextInput
          style={s.insulinNumber}
          onChangeText={setUnits}
          keyboardType={'numeric'}
          value={units}
          autoFocus={true}
        />
      </View>
      <Text style={s.insulinText}>units of</Text>
      <TouchableOpacity
        style={s.insulinNumberContainer}
        onPress={() => setModalVisible(true)}>
        <Text style={s.insulinNumber}>{insulinType}</Text>
        <Icon
          name="caret-down"
          size={20}
          color={colour.smoke}
          style={s.caret}
        />
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={s.centeredView}>
          <View style={s.modalView}>
            <FlatList
              contentContainerStyle={s.modalFlatList}
              data={insulinNames}
              renderItem={renderInsulinTypes}
              keyExtractor={item => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  insulinContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: spacing,
    paddingVertical: spacing * 2,
    marginTop: 2,
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
});

export default Insulin;
