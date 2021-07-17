import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colour} from '../styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Food from './Food';
import Insulin from './Insulin';
import Tags from './Tags';

interface CustomInputProps {
  onScreenChange: any;
}

const Add = (props: CustomInputProps) => {
  const initialMode: any = 'date';
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [tags, setTags] = useState([
    ['BREAKFAST', false],
    ['LUNCH', true],
    ['DINNER', false],
    ['LOW', false],
    ['HIGH', false],
    ['SNACK', false],
  ]);

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

  return (
    <View style={s.screen}>
      <ScrollView>
        <View style={s.header}>
          <View>
            <Text style={s.text} onPress={() => props.onScreenChange('MAIN')}>
              Cancel
            </Text>
          </View>
          <View style={s.smallButton}>
            <Text
              style={s.saveText}
              onPress={() => props.onScreenChange('MAIN')}>
              SAVE
            </Text>
          </View>
        </View>
        <View style={s.dateTimeContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={[s.dateTimeText, s.blueText]}>
              {moment(date).format('D MMM YYYY')}
            </Text>
          </TouchableOpacity>
          <Text style={s.dateTimeText}>at</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={[s.dateTimeText, s.blueText]}>
              {moment(date).format('h:mm a')}
            </Text>
          </TouchableOpacity>
        </View>
        <Tags tags={tags} setTags={setTags} />
        <Food />
        <Insulin />
        <View style={s.buttonsContainer}>
          <Text style={s.buttonText}>ADD</Text>
          <TouchableOpacity style={s.button}>
            <Text style={s.buttonText}>FOOD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button}>
            <Text style={s.buttonText}>INSULIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button}>
            <Text style={s.buttonText}>NOTE</Text>
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
    backgroundColor: colour.grey900,
    flex: 1,
  },
  header: {
    backgroundColor: colour.black,
    padding: 10,
    paddingTop: 60,
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
    color: colour.smoke,
  },
  saveText: {
    fontSize: 16,
    color: colour.black,
  },
  smallButton: {
    backgroundColor: colour.green,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 4,
    height: 26,
  },
  dateTimeContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colour.smoke,
    marginRight: 4,
  },
  buttonsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 4,
    borderColor: colour.smoke,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginLeft: 14,
  },
  buttonText: {
    fontSize: 16,
    color: colour.smoke,
  },
  blueText: {
    color: colour.blue,
  },
});

export default Add;
