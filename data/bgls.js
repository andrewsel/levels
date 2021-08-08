import moment from 'moment';

export const getBgls = () => {
  const bgls = [];
  let time = moment('2021-08-08T18:01:00.000Z');
  let level = 6.2;

  for (let i = 0; i < 200; i++) {
    bgls.push({
      date: time.toISOString(),
      level: Math.round(level * 1e1) / 1e1,
    });
    time = time.add(5, 'minutes');
    level = Math.max(Math.min(16.8, level + (Math.random() - 0.5) * 4), 2.6);
  }
  // console.log(bgls);
  return bgls;
  // return {
  //   date: '2021-07-29T16:22:00.000+1000',
  //   level: 7.2,
  // };
};

// export const bgls = [
//   {
//     date: '2021-07-29T16:22:00.000+1000',
//     level: 7.2,
//   },
// ];
