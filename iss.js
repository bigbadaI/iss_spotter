const request = require('request');

let ip = "";
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const ISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, coordinates) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(coordinates, (error, passes) => {
        if (error) {
          return callback(error,null);
        }
        callback(null, passes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  ISSTimesForMyLocation
};