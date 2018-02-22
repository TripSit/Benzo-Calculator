var express = require('express');
var _ = require('underscore')._;
var request = require('request');
var router = express.Router();

var drugCache = {};
var aliasCache = {};
var benzoCache = {};
var totalCache = {};
var diazepamCache = {};
var updateCache = function() {
  try {
    // Get the drugs
    request.get('http://tripbot.tripsit.me/api/tripsit/getAllDrugs', {
      'json': true,
    }, function(request, response, body) {
      try { // Get cache
        drugCache = body.data[0];
        // update alias cache
        
       // Get all benzodiazepines that can be dose compared
        benzoCache = {};
        // search for the first number sequence of a number in a sentence
        var regex = /[0-9]+\.?[0-9]?/;
        // Filter any drug not containing the dose_to_diazepam property
        benzoCache = _.filter((drugCache), function(drugCache) { return _.has(drugCache.properties, 'dose_to_diazepam'); });
        // Get all aliases
        aliasCache = [];
        _.each(benzoCache, function(d) {
          _.each(d.aliases, function(a) {
            aliasCache.push({ 
                name: a,
                pretty_name: a,
                diazvalue: regex.exec(d.properties.dose_to_diazepam)
              }); 
          }); 
        });
        // Combine the two and sort by name
        totalCache = aliasCache + benzoCache;
        totalCache = _.sortBy(benzoCache, 'name');
        // Apply a value Select2 can use to calculate with
        totalCache = _.each(totalCache, function(totalCache){
           totalCache.diazvalue = regex.exec(totalCache.properties.dose_to_diazepam);
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
   res.render("index",{benzo: totalCache, alias: aliasCache});
});



module.exports = router;
