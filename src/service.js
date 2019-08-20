var unirest = require('unirest');
var TripArrayBuilder = require('./trip.model.js');

exports.getFiveCheapestTrips = function(departureDate, returnDate) {
  return new Promise((resolve, reject) => {
    unirest.post("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0")
      .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "8f9cdf9352mshe66630d8c7fa219p1a9887jsnfb3541a87b9c")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .send("cabinClass=economy")
      .send("children=0")
      .send("infants=0")
      .send("country=AU")
      .send("currency=AUD")
      .send("locale=en-AU")
      .send("originPlace=SYDA-sky")
      .send("destinationPlace=ADLA-sky")
      .send(`outboundDate=${departureDate}`)
      .send(`inboundDate=${returnDate}`)
      .send("adults=1")
      .end(function(response) {
        if(response.error) { return reject(response.error) }
        pollLiveResults(response)
          .then((res) => { return resolve(res) })
          .catch((e) => console.log("error", e))
      });
    })
}

function pollLiveResults(result) {
  var sessionKey = result.headers.location.split(/[/ ]+/).pop();
  return new Promise((resolve, reject) => {
    unirest.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${sessionKey}?pageIndex=0&pageSize=5&stops=0&sortType=price&sortOrder=asc&outboundDepartStartTime=18:00&inboundDepartStartTime=16:00`)
      .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "8f9cdf9352mshe66630d8c7fa219p1a9887jsnfb3541a87b9c")
      .end(function(response) {
        return resolve(filterLiveResults(response));
      });
  })
}

function filterLiveResults(result) {
  var tripArrayBuilder = TripArrayBuilder.buildTripObjects(result.body.Itineraries, result.body.Carriers, result.body.Legs);
  return tripArrayBuilder;
}
