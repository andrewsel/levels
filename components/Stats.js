import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour} from '../styles/styles';
import TimeInRangeGraph from './TimeInRangeGraph';
import AverageBGLGraph from './AverageBGLGraph';
import {bglTimeframes} from '../helpers/enums';

const Stats = ({timesInRange, averageBgls, bglTimeframe, hidden}) => {
  const isHidden = hidden ? {display: 'none'} : {display: 'flex'};

  return (
    <View style={[s.stats, isHidden]}>
      <View>
        <Text style={s.bigNumber}>
          {bglTimeframe === bglTimeframes.ONE_DAY
            ? timesInRange.oneDay
            : timesInRange.sevenDays}
          %
        </Text>

        {bglTimeframe === bglTimeframes.ONE_DAY && (
          <TimeInRangeGraph timeInRange={timesInRange.oneDay} />
        )}
        {bglTimeframe === bglTimeframes.SEVEN_DAYS && (
          <TimeInRangeGraph timeInRange={timesInRange.sevenDays} />
        )}
        <Text style={s.statLabel}>TIME IN RANGE</Text>
      </View>
      {bglTimeframe === bglTimeframes.ONE_DAY && averageBgls.oneDay !== 'NaN' && (
        <View>
          <Text style={s.bigNumber}>{averageBgls.oneDay}</Text>
          <AverageBGLGraph averageBgl={averageBgls.oneDay} />
          <Text style={s.statLabel}>AVERAGE BGL</Text>
        </View>
      )}
      {bglTimeframe === bglTimeframes.SEVEN_DAYS && (
        <View>
          <Text style={s.bigNumber}>{averageBgls.sevenDays}</Text>
          <AverageBGLGraph averageBgl={averageBgls.sevenDays} />
          <Text style={s.statLabel}>AVERAGE BGL</Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  stats: {
    paddingHorizontal: 10,
    paddingVertical: 50,
    backgroundColor: colour.black,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bigNumber: {
    color: colour.smoke,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statLabel: {
    color: colour.smoke,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Stats;
