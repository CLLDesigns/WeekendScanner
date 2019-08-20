var express = require('express');
var router = express.Router();
var trips = require('../service');

// GET /api/trips
router.route("/trips")
  .get((request, response) => {
    trips.getFiveCheapestTrips("2019-09-10", "2019-09-15")
      .then(res => response.json(res))
      .catch((e) => console.log("error", e));
  })

module.exports = router;
