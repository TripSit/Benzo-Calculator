var express = require('express');
var _ = require('underscore')._;
var request = require('request');
var router = express.Router();

var drugCache = {};
var benzoCache = {};

function getAlias() {
 _.each(benzoCache, function(benzo) {
  _.each(benzo.aliases, function(alias) {
   benzoCache.push({
    // Add used properties to new objects
    name: alias,
    pretty_name: alias.charAt(0).toUpperCase() + alias.slice(1),
    properties: benzo.properties,
    formatted_dose: benzo.formatted_dose,
    });
  });
 }); 
}

function sortCache() {
  benzoCache = _.sortBy(benzoCache, 'name');
  // Apply a value Select2 can use to calculate with
  var regex = /[0-9]+\.?[0-9]?/; // search for the first number sequence of a number in a sentence
  benzoCache = _.each(benzoCache, function(benzoCache) {
    benzoCache.diazvalue = regex.exec(benzoCache.properties.dose_to_diazepam);
  });
}

function formatCache() {
  benzoCache = {};
        // Filter any drug not containing the dose_to_diazepam property
        benzoCache = _.filter((drugCache), function(drugCache) {
          return _.has(drugCache.properties, 'dose_to_diazepam');
        });
}

var updateCache = function() {
 // Get the drugs
 request.get('http://tripbot.tripsit.me/api/tripsit/getAllDrugs', {
  'json': true,
 }, 
 function(request, response, body) {
    // Get cache
    drugCache = body.data[0];
    // Format Dose
    formatCache();
    // Get all aliases
    getAlias();
    // Sort cache
    sortCache();
  });
};

// Update from our cache every minute, update from erowid's api every 60 minutes
setInterval(updateCache, 60000);
updateCache();

// Routes
router.get("/", function(req, res) {
  res.render("index", {benzo: benzoCache});
});

module.exports = router;