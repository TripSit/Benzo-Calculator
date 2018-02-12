var express = require('express');
var _ = require('underscore')._;
var request = require('request');
var router = express.Router();

var drugCache = {};
var aliasCache = {};
var benzoCache = {};
var diazepamCache = {};
var updateCache = function() {
  try {
    // Get the drugs
    request.get('http://tripbot.tripsit.me/api/tripsit/getAllDrugs', {
      'json': true,
    }, function(request, response, body) {
      try { // Get cache
        drugCache = body.data[0];
       // Get all benzodiazepines that can be dose compared
        benzoCache = {};
        diazepamCache = {};
        
        benzoCache = _.filter((drugCache), function(drugCache) { return _.has(drugCache.properties, 'dose_to_diazepam'); });
        benzoCache = _.sortBy(benzoCache, 'name');
        // this does not work
        diazepamCache = _.each(benzoCache.dose._to_diazepam, alert);
      } catch (err) {}
    });
  } catch (err) {}
};


// Update from our cache every minute, update from erowid's api every 60 minutes
setInterval(updateCache, 60000);
updateCache();

// Routes
router.get("/", function(req, res){
//   var drugs = _.sortBy(drugCache, 'name');
   res.render("index",{benzo: benzoCache, diaz: diazepamCache});
});



module.exports = router;