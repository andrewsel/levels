import moment from 'moment';

function getArrayPosition(x) {
  return Math.floor(x / 5);
}

const getBgls = (
  startTime = '2021-08-08T18:01:00.000Z',
  startLevel = 6.2,
  hours = 10,
  maxBgl = 16.8,
  minBgl = 2.6,
  maxVariancePerFiveMins = 2,
) => {
  const bglsArr = [];
  let time = moment(startTime);

  for (let i = 0; i < hours * 12; i++) {
    bglsArr.push({
      date: time.toISOString(),
      level: Math.round(startLevel * 1e1) / 1e1,
    });
    time = time.add(5, 'minutes');
    startLevel = Math.max(
      Math.min(
        maxBgl,
        startLevel + (Math.random() - 0.5) * maxVariancePerFiveMins * 2,
      ),
      minBgl,
    );
  }

  const bglsByDate = {};

  bglsArr.map(bgl => {
    const hour = bgl.date.slice(0, 13);
    if (!bglsByDate[hour]) {
      bglsByDate[hour] = new Array(12).fill(0).map(() => null);
    }
    // Array is 12 values (1 per 5 mins)
    // Below rounds down to nearest 5 min increment
    // and returns array position
    const arrayPosition = getArrayPosition(bgl.date.slice(14, 16));
    bglsByDate[hour][arrayPosition] = bgl.level;
  });

  // console.log(bglsByDate);
  return bglsByDate;
};

export const bgls = getBgls();

// export const bgls = [
//   {
//     date: '2021-07-29T16:22:00.000+1000',
//     level: 7.2,
//   },
// ];
