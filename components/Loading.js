import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colour} from '../styles/styles';
import moment from 'moment';
import AppleHealthKit from 'react-native-health';
import {screens} from '../helpers/enums';
const axios = require('axios');

const Loading = ({
  setAppleHealthConnected,
  setBgls,
  setEventsByHour,
  setEventsById,
  setEventsList,
  setAverageBgls,
  setTimesInRange,
  setScreen,
}) => {
  const [status, setStatus] = useState('Starting Up...');

  // On mount
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getData() {
    await getAppleHealthData();
  }

  // Get BGLs from Apple Health
  async function getAppleHealthData() {
    console.log('Getting BGLs...');
    setStatus('Getting BGLs...');
    let options = {
      startDate: moment().subtract(3, 'months').toISOString(),
    };
    AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
      if (err) {
        console.log(err);
        setScreen(screens.menu);
        return false;
      }
      setAppleHealthConnected(true);
      console.log('Set Apple Health Connected to True');
      const appleHealthObj = getAppleHealthObj(results);
      getDataFromDb(appleHealthObj);
    });
  }

  function getAppleHealthObj(results) {
    console.log('getAppleHealthObj');
    const bglsObj = {};
    results.map(r => {
      bglsObj[r.startDate] = r.value;
    });
    console.log('Got bgl object');
    // console.log(bglsObj);
    return bglsObj;
  }

  async function getDataFromDb(appleHealthObj) {
    const axiosConfig = {};
    const url =
      'https://f5mgf9nw47.execute-api.ap-southeast-2.amazonaws.com/prod/bgls';
    setStatus('Sending BGLs to DB...');
    console.log('Sending BGLs to DB...');
    try {
      const {data} = await axios.post(url, appleHealthObj, axiosConfig);
      // console.log(data);
      // const parsedData = JSON.parse(data);
      console.log('Got data from DB');
      setStatus('Got data from DB');
      // console.log(data);
      const {
        bgls,
        eventsByHour,
        eventsById,
        eventsList,
        averageBgls,
        timesInRange,
      } = data;
      setBgls(bgls);
      setEventsByHour(eventsByHour);
      setEventsById(eventsById);
      setEventsList([
        {id: 'stats', time: '2099-01-01'},
        {id: 'search', time: '2098-01-01'},
        ...eventsList,
      ]);
      // console.log(eventsList[5]);
      setAverageBgls(averageBgls);
      setTimesInRange(timesInRange);
    } catch (error) {
      console.error(error);
      return false;
    }
    setScreen(screens.main);
    return true;
  }

  return (
    <View style={s.screen}>
      <Text style={s.text}>LEVELS</Text>
      <Text style={s.textSmall}>{status}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colour.smoke,
    fontSize: 24,
  },
  textSmall: {
    color: colour.smoke,
    fontSize: 18,
  },
});

export default Loading;

/*


const Loading = ({
  setAppleHealthConnected,
  latestEntryFromAppleHealth,
  setLatestEntryFromAppleHealth,
  setBgls,
  setAverageBgls,
  setTimesInRange,
  setScreen,
}) => {
  const [status, setStatus] = useState('Starting Up...');

  // On mount
  useEffect(() => {
    getBgls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get BGLs from Apple Health
  const getBgls = () => {
    console.log('Getting BGLs...');
    setStatus('Getting BGLs...');
    let options = {
      startDate: new Date(2021, 0, 0).toISOString(),
    };
    AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
      if (err) {
        console.log(err);
        setScreen(screens.menu);
        return;
      }
      setAppleHealthConnected(true);
      console.log(results);
      console.log(
        'Is ' +
          results[0].startDate +
          ' after ' +
          latestEntryFromAppleHealth +
          '?',
      );
      if (moment(results[0].startDate).isAfter(latestEntryFromAppleHealth)) {
        console.log('YES');
        postToDB(results);
      } else {
        console.log('NO');
        console.log('No new entries from Apple Health');
        setScreen(screens.main);
      }
    });
  };

  const postToDB = async results => {
    console.log('Formatting BGLs...');
    setStatus('Formatting BGLs...');
    const axiosConfig = {};
    const url =
      'https://f5mgf9nw47.execute-api.ap-southeast-2.amazonaws.com/prod/bgls';
    const bglsObj = {};
    results.map(r => {
      // To Do - Format to match DB
      bglsObj[r.startDate] = r.value;
    });
    // console.log(bglsObj);
    try {
      setStatus('Sending BGLs to DB...');
      console.log('Sending BGLs to DB...');
      const {data} = await axios.post(url, bglsObj, axiosConfig);
      const bgls = JSON.parse(data);
      setStatus('Setting BGLs...');
      setBgls(bgls);
      // console.log(bgls);
      getAverageBglsAndTimeInRange(bgls);
    } catch (error) {
      console.error(error);
    }
  };

  const getAverageBglsAndTimeInRange = bgls => {
    console.log(bgls);
    let oneDayTotal = 0;
    let sevenDayTotal = 0;
    let oneDayValues = 0;
    let sevenDayValues = 0;
    let oneDayInRangeVals = 0;
    let sevenDayInRangeVals = 0;
    const now = moment();
    const oneDayAgo = moment().subtract(1, 'days');
    const sevenDaysAgo = moment().subtract(7, 'days');
    for (const [startDate, value] of Object.entries(bgls)) {
      if (moment(startDate).isBetween(oneDayAgo, now)) {
        oneDayTotal += value;
        oneDayValues += 1;
        if (value > 3.9 && value < 10) {
          oneDayInRangeVals += 1;
        }
      }
      if (moment(startDate).isBetween(sevenDaysAgo, now)) {
        sevenDayTotal += value;
        sevenDayValues += 1;
        if (value > 3.9 && value < 10) {
          sevenDayInRangeVals += 1;
        }
      }
    }
    const avgBgls = {
      oneDay: (oneDayTotal / oneDayValues).toFixed(1),
      sevenDays: (sevenDayTotal / sevenDayValues).toFixed(1),
    };
    console.log(avgBgls);
    setAverageBgls(avgBgls);
    const timesInRnge = {
      oneDay:
        oneDayValues === 0
          ? 100
          : ((oneDayInRangeVals / oneDayValues) * 100).toFixed(0),
      sevenDays:
        sevenDayValues === 0
          ? 100
          : ((sevenDayInRangeVals / sevenDayValues) * 100).toFixed(0),
    };
    console.log(timesInRnge);
    setTimesInRange(timesInRnge);

    console.log('Ready to go!');
    setStatus('Ready to go!');
    setScreen(screens.graph);
  };

  return (
    <View style={s.screen}>
      <Text style={s.text}>LEVELS</Text>
      <Text style={s.textSmall}>{status}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    backgroundColor: colour.grey900,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colour.smoke,
    fontSize: 24,
  },
  textSmall: {
    color: colour.smoke,
    fontSize: 18,
  },
});

export default Loading;
*/
