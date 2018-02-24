var express = require('express');
var _ = require('underscore')._;
var request = require('request');
var router = express.Router();

var drugCache = {};
var benzoCache = {};
var updateCache = function() {
  try {
    // Get the drugs
    request.get('http://tripbot.tripsit.me/api/tripsit/getAllDrugs', {
      'json': true,
    }, function(request, response, body) {
      try { // Get cache
        drugCache = body.data[0];
        benzoCache = {};
        // Filter any drug not containing the dose_to_diazepam property
        benzoCache = _.filter((drugCache), function(drugCache) { return _.has(drugCache.properties, 'dose_to_diazepam'); });
        // Get all aliases and assign the same values as the real name
        _.each(benzoCache, function(d) {
          _.each(d.aliases, function(a) {
            benzoCache.push({ 
                name: a,
                pretty_name: a,
                properties: d.properties,
              }); 
          }); 
        });
        benzoCache = _.sortBy(benzoCache, 'name');
        // Apply a value Select2 can use to calculate with
        var regex = /[0-9]+\.?[0-9]?/; // search for the first number sequence of a number in a sentence
        benzoCache = _.each(benzoCache, function(benzoCache){
           benzoCache.diazvalue = regex.exec(benzoCache.properties.dose_to_diazepam);
        });
        
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
   res.render("index",{benzo: benzoCache});
});



module.exports = router;
