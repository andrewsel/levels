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
import EditFood from './EditFood';
import EditInsulin from './EditInsulin';
import Tags from './Tags';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import EditNote from './EditNote';
const axios = require('axios');

const part = {
  food: 'FOOD',
  insulin: 'INSULIN',
  note: 'NOTE',
};

const Add = ({
  entryList,
  setEntryList,
  setScreen,
  insulinTypes,
  eventsById,
  setEventsById,
  eventsByHour,
  setEventsByHour,
}) => {
  const initialMode = 'date';
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [tags, setTags] = useState([
    ['BREAKFAST', false],
    ['LUNCH', false],
    ['DINNER', false],
    ['LOW', false],
    ['HIGH', false],
    ['SNACK', false],
  ]);
  const [foods, setFoods] = useState([]);
  const [insulins, setInsulins] = useState([]);
  const [notes, setNotes] = useState([]);

  const getTags = () => {
    const finalTags = [];
    tags.map(t => {
      if (t[1]) {
        finalTags.push(t[0]);
      }
    });
    return finalTags;
  };

  const getIsoTzDate = date => {
    const offset = moment(date).utcOffset();
    let hours = offset / 60;
    const negative = hours < 0 ? true : false;
    hours = negative ? Math.ceil(hours) : Math.floor(hours);
    hours =
      negative && hours !== 0
        ? hours.toString().slice(1, 3)
        : hours.toString().slice(0, 2);
    hours = hours.length < 2 ? '0' + hours : hours;
    let minutes = Math.abs(offset % 60).toString();
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    const offsetTime = moment(date).add(offset, 'minutes').toISOString();
    const sign = negative ? '-' : '+';
    const finalTime = offsetTime.replace('Z', sign + hours + minutes);
    return finalTime;
  };

  const handleSave = () => {
    const newEntry = {
      id: uuid(),
      time: getIsoTzDate(date),
      tags: getTags(),
      insulins,
      foods,
      notes,
    };
    const newEntryList = entryList.slice();
    newEntryList.push(newEntry);
    setEntryList(newEntryList);
    setEventsById({
      ...eventsById,
      ...{
        [newEntry.id]: newEntry,
      },
    });
    const hour = newEntry.time.slice(0, 13);
    const minutes = newEntry.time.slice(14, 16);
    const position = Math.floor(minutes / 15);
    const updatedHour = eventsByHour[hour]
      ? eventsByHour[hour]
      : [[], [], [], []];
    updatedHour[position].push(newEntry);
    setEventsByHour({...eventsByHour, ...updatedHour});
    saveEventToDb(newEntry);
    setScreen('MAIN');
  };

  async function saveEventToDb(event) {
    const axiosConfig = {};
    const url =
      'https://f5mgf9nw47.execute-api.ap-southeast-2.amazonaws.com/prod/event';
    console.log('Sending event to DB...');
    try {
      await axios.post(url, event, axiosConfig);
    } catch (error) {
      console.error(error);
    }
    console.log('Event successfully saved');
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');

    setDate(currentDate);
  };

  const showMode = currentMode => {
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
        {/* SAVE AND CANCEL BUTTONS */}
        <View style={s.header}>
          <View>
            <Text style={s.text} onPress={() => setScreen('MAIN')}>
              Cancel
            </Text>
          </View>
          <View style={s.smallButton}>
            <Text style={s.saveText} onPress={() => handleSave()}>
              SAVE
            </Text>
          </View>
        </View>
        {/* DATE AND TIME */}
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
        {/* TAGS */}
        <View style={{backgroundColor: colour.black}}>
          <Tags tags={tags} setTags={setTags} />
        </View>
        {/* FOOD, INSULIN AND NOTES */}
        {foods.map((food, index) => (
          <View key={index}>
            <EditFood foods={foods} setFoods={setFoods} partIndex={index} />
          </View>
        ))}
        {notes.map((note, index) => (
          <View key={index}>
            <EditNote notes={notes} setNotes={setNotes} partIndex={index} />
          </View>
        ))}
        {insulins.map((insulin, index) => (
          <View key={index}>
            <EditInsulin
              insulins={insulins}
              setInsulins={setInsulins}
              partIndex={index}
              insulinTypes={insulinTypes}
            />
          </View>
        ))}
        {/* ADD BUTTONS */}
        <View style={s.buttonsContainer}>
          <Text style={s.buttonText}>ADD</Text>
          <TouchableOpacity
            style={s.button}
            onPress={() =>
              setFoods([...foods, {partType: part.food, id: uuid()}])
            }>
            <Text style={s.buttonText}>FOOD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button}>
            <Text
              style={s.buttonText}
              onPress={() =>
                setInsulins([...insulins, {partType: part.insulin, id: uuid()}])
              }>
              INSULIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.button}
            onPress={() => setNotes([...notes, {partType: part.note}])}>
            <Text style={s.buttonText}>NOTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* DATE/TIME PICKER */}
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
