const request = require("request")
const geoCode = (address, callback) => {
      const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFuaXNoMzkzIiwiYSI6ImNsNjVlbTF1NzAyNGUzY3BmMDByYTZ3MmoifQ.gUBGmBGznMzE3K26xZY_GA&limit=1`
      request({ url: geocodeURL, json: true }, (err, {body}) => {
            if (err) {
                  callback("Unable to connect to location services!", undefined)
            }
            else if (body?.features?.length === 0 || body.message === "Forbidden") {
                  callback("Unable to find location. Try another search.", undefined)
            }
            else {
                  callback(undefined, {
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0],
                        location: body.features[0].place_name
                  })
            }
      })
}
module.exports=geoCode