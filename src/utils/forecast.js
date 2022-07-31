const request = require("request")
const foreCast = (latitude, longitude, callback) => {
      const url = `http://api.weatherstack.com/current?access_key=c31f846f2ff2842c735482cc40b737e5&query=${latitude},${longitude}`
      request({ url: url, json: true }, (err, { body }) => {
            if (err) {
                  callback('Unable to connect to weather service!', undefined)
            }
            else if (body.error) {
                  callback("Please specify a valid location", undefined)
            }
            else {
                  callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
            }
      })
}
module.exports = foreCast