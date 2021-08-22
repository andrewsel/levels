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

const bglsModel = {
  '2021-08-08T18': [6.2, 6.8, 6.5, 6.1, 6.4, 6.2, 5.6, 7, 7.5, 8.4, 9.4, 7.4],
  '2021-08-08T19': [
    6.7, 7.1, 8, 9.1, 8.9, 9.5, 9.2, 9.8, 10.4, 10.8, 10.5, 12.4,
  ],
  '2021-08-08T20': [
    12.3, 10.7, 10.9, 10.4, 8.5, 7.2, 7, 8.2, 6.5, 5.5, 6.8, 5.5,
  ],
  '2021-08-08T21': [4.8, 5, 6.9, 7.2, 6.3, 5.8, 6.5, 5.2, 3.7, 2.7, 2.6, 2.6],
  '2021-08-08T22': [3.6, 2.6, 3.4, 3.8, 2.6, 2.6, 2.6, 3.7, 3.3, 4.2, 2.8, 2.6],
  '2021-08-08T23': [2.6, 4.6, 5.1, 6.6, 5.9, 4.2, 4.3, 3.5, 2.6, 2.6, 3.4, 4.3],
  '2021-08-09T00': [3, 4.4, 5.2, 5.6, 7.3, 6.9, 6.3, 7.7, 6.1, 8, 7.6, 7.6],
  '2021-08-09T01': [8.9, 7.9, 7.2, 5.4, 6.5, 7.4, 8.2, 9.1, 10.5, 9.4, 7.8, 7],
  '2021-08-09T02': [6.9, 5.5, 5.7, 5.6, 3.9, 3.3, 2.6, 2.6, 2.6, 4.1, 4.4, 5.2],
  '2021-08-09T03': [3.3, 2.6, 2.6, 2.6, 3, 3.3, 5.3, 5.1, 3.2, 4, 2.8, 2.6],
};
