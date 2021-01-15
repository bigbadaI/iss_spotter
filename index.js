const { ISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("it didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp('50.93.7.189', (error, coordinates) => {
//   if (error) {
//     console.log("Fetching Ip didn't work!" , error);
//     return;
//   }
//   console.log("It worked! Coordinates:" , coordinates);
// });

// fetchISSFlyOverTimes({latitude: '54.266', longitude:'-110.7351'}, (error, passes) => {
//   if (error) {
//     console.log("Fetching Ip didn't work!" , error);
//     return;
//   }
//   console.log("It worked! ISS passes are:" , passes);
// });

const printPassTimes = function(passes) {
  for (const pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

ISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work:" , error);
  }
  printPassTimes(passes);
});

