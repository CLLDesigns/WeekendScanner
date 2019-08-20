module.exports = function(app) {
  var trips = require('./trips');
  app.use('/api', trips);
};
