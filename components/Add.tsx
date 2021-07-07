import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colours from '../colours';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface CustomInputProps {
  onScreenChange: any;
}

const Add = (props: CustomInputProps) => {
  const initialMode: any = 'date';
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [food, setFood] = useState([]);
  const [insulin, setInsulin] = useState('');
  const [mode, setMode] = useState(initialMode);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  // const onChangeUnits = (event: any) => {
  //   setUnits(event.value);
  // };

  return (
    <View style={s.screen}>
      <ScrollView>
        <View style={s.header}>
          <View>
            <Text style={s.text} onPress={() => props.onScreenChange('MAIN')}>
              Cancel
            </Text>
          </View>
          <View style={s.pill}>
            <Text
              style={s.pillText}
              onPress={() => props.onScreenChange('MAIN')}>
              Add
            </Text>
          </View>
        </View>
        <View style={s.container}>
          <TouchableOpacity style={s.row} onPress={showDatePicker}>
            <Text style={s.label}>Date</Text>
            <Text style={s.value}>{moment(date).format('D MMM YYYY')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.row, s.rowLast]} onPress={showTimePicker}>
            <Text style={s.label}>Time</Text>
            <Text style={s.value}>{moment(date).format('h:mm a')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.row} onPress={showDatePicker}>
            <Text style={s.label}>Insulin Type</Text>
            <TextInput style={s.value} value="Actrapid" />
          </TouchableOpacity>
          <TouchableOpacity style={[s.row, s.rowLast]}>
            <Text style={s.label}>Units</Text>
            <TextInput
              style={s.value}
              keyboardType="numeric"
              onChangeText={setInsulin}
              value={insulin}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            themeVariant="dark"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colours.black,
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
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 20,
    color: colours.smoke,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colours.darkgrey,
    borderBottomColor: colours.black,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  rowLast: {
    borderBottomWidth: 0,
    paddingVertical: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colours.smoke,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colours.smoke,
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colours.smoke,
  },
  pill: {
    backgroundColor: colours.green,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 40,
    height: 26,
  },
  pillText: {
    fontSize: 14,
    color: colours.darkgrey,
    margin: 0,
    padding: 0,
  },
});

export default Add;
