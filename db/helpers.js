/* eslint-disable no-param-reassign */
const nodeSchedule = require('node-schedule');

const User = require('../models/User.js');
require('./database.js');

const recurrenceRule = new nodeSchedule.RecurrenceRule();
recurrenceRule.hour = 4;
// recurrenceRule.second = new nodeSchedule.Range(0, 59, 10);

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomPairOfSocks = (socks) => {
  const freshSocks = socks.slice();

  const defaultSock = {
    brand: '-',
    color: '-',
    description: 'No socks are available for today! Go to the sock store!',
    image: 'https://cdn.drawception.com/images/panels/2016/3-24/dwrnhO6q84-4.png',
  };
  const todaysSocks = {
    date: new Date(),
    left: defaultSock,
    right: defaultSock,
  };
  // Get left sock
  const randomLeft = getRandomIntInclusive(0, (freshSocks.length - 1));
  const leftSock = freshSocks[randomLeft];
  freshSocks.splice(randomLeft, 1);
  if (leftSock) todaysSocks.left = leftSock;

  // Get left sock
  const randomRight = getRandomIntInclusive(0, (freshSocks.length - 1));
  const rightSock = freshSocks[randomRight];
  freshSocks.splice(randomRight, 1);
  if (rightSock) todaysSocks.right = rightSock;
  return todaysSocks;
};

module.exports = nodeSchedule.scheduleJob(recurrenceRule, () => {
  User.find({})
    .then((userList) => {
      userList.forEach((user) => {
        const { email } = user;
        const todaysSocks = getRandomPairOfSocks(user.socks);
        user.sockHistory.push(todaysSocks);
        console.log(user);
        User.findOneAndUpdate({ email }, user, (err) => {
          if (err) throw new Error(err);
        });
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// Use below function to reset all user's socks and sock history

// nodeSchedule.scheduleJob(recurrenceRule, () => {
//   User.find({})
//     .then((userList) => {
//       userList.forEach((user) => {
//         const { email } = user;
//         user.sockHistory = [];
//         user.socks = [];
//         User.findOneAndUpdate({ email }, user, (err) => {
//           if (err) throw new Error(err);
//         });
//       });
//       console.log('ALL USERS SOCK LIST AND SOCK HISTORY RESET!!');
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// });
