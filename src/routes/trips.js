var express = require('express');
var router = express.Router();
var trips = require('../service');

// GET /api/trips?departureDate=YYYY-MM-DD&returnDate=YYYY-MM-DD
router.route("/trips")
  .get((request, response) => {
    if(Object.entries(request.query).length === 0 && request.query.constructor === Object) {
      response.status(400).send({ error: 'No dates provided. This endpoint requires a departureDate and returnDate.' })
    } else {
      trips.getFiveCheapestTrips(request.query.departureDate, request.query.returnDate)
        .then(res => response.json(res))
        .catch((e) => console.log("error", e));
    }
  })

module.exports = router;
