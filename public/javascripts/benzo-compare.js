$(document).ready(function() {
  
  // Convert object into a map so it works with Select2
  var data = $.map(benzo, function(obj) {
    obj.text = obj.text || obj.pretty_name;
    obj.id = obj.id || obj.diazvalue;
    return obj;
  });
  // Fill out dropdown menus
  $('#inputSubstance').select2({
    data: data,
    width: '256px',
  });
  
  // Pick a random option for output
  var randomIndex = Math.floor(Math.random()*benzo.length); 
  var iter = 0; 
  $.map(benzo, function(obj) { 
    if (randomIndex == iter) { 
      obj.selected = true; 
    } 
    iter += 1; 
    return obj; 
  });
  $('#outputSubstance').select2({
    data: data,
    width: '256px',
  });
  // Append output information
  appendData('output');
  // Append input information
  appendData('input');
});

// Extract needed values from the returned object
function render_pretty(a) {
  var benzoProperties = new Object();
  benzoProperties.summary = a['properties']['summary'];
  benzoProperties.effects = a['properties']['effects'];
  benzoProperties.duration = a['properties']['duration'];
  benzoProperties.aftereffects = a['properties']['after-effects'];
  if (a['formatted_dose']['Oral'] != undefined) {
    benzoProperties.doseLight = a['formatted_dose']['Oral']['Light'];
    benzoProperties.doseLow = a['formatted_dose']['Oral']['Low'];
    benzoProperties.doseCommon = a['formatted_dose']['Oral']['Common'];
    benzoProperties.doseHeavy = a['formatted_dose']['Oral']['Heavy'];
    benzoProperties.doseStrong = a['formatted_dose']['Oral']['Strong'];
  } else if (a['formatted_dose']['none'] != undefined) {
    benzoProperties.doseLight = a['formatted_dose']['none']['Light'];
    benzoProperties.doseLow = a['formatted_dose']['none']['Low'];
    benzoProperties.doseCommon = a['formatted_dose']['none']['Common'];
    benzoProperties.doseHeavy = a['formatted_dose']['none']['Heavy'];
    benzoProperties.doseStrong = a['formatted_dose']['none']['Strong'];
  } else if (a['formatted_dose']['Light:'] != undefined) {
    benzoProperties.doseLight = a['formatted_dose']['Light:']['Light'];
    benzoProperties.doseLow = a['formatted_dose']['Light:']['Low'];
    benzoProperties.doseCommon = a['formatted_dose']['Light:']['Common'];
    benzoProperties.doseHeavy = a['formatted_dose']['Light:']['Heavy'];
    benzoProperties.doseStrong = a['formatted_dose']['Light:']['Strong'];
  }
  return benzoProperties;
}

// Find selected value in the array and return it
function find_by_pretty(benzo, pretty_name) {
  var found = null;
  benzo.forEach(function(each) {
    if (each['pretty_name'] == pretty_name) {
      found = each;
      return;
    }
  });
  return found;
}

// Fill out the list-group info
function appendData(id) {
  var selectedId = document.getElementById('select2-' + id + 'Substance-container');
  var output = document.getElementById('select2-outputSubstance-container');
  var selectedText = selectedId.title;
  var selectedLowCaseText = selectedText.toLowerCase();

	var id_benzo = find_by_pretty(benzo, selectedText);
	id_benzo = render_pretty(id_benzo);
	$('#' + id + 'Name').fadeOut(400, function(){
	  $(this).attr('href', 'http://drugs.tripsit.me/' + selectedLowCaseText).text(selectedText)
   }).fadeIn(600);
 
  // Add correct values to the two input-groups. A bit messy due to the API
  if (id_benzo.summary !== undefined) {
    $('#' + id + 'Summary').text('').fadeOut(400, function(){
      $(this).text(id_benzo.summary)
    }).fadeIn(600);
  } else {
    $('#' + id + 'Summary').fadeOut(400, function(){
    $(this).text('No summary available')
    }).fadeIn(600); 
  }
  if (id_benzo.effects !== undefined) {
    $('#' + id + 'Effects').fadeOut(400, function(){
      $(this).text(id_benzo.effects)
    }).fadeIn(600);
  } else {
    $('#' + id + 'Effects').fadeOut(400, function(){
    $(this).text('No effects available')
    }).fadeIn(600); }
  if (id_benzo.duration !== undefined) {
    $('#' + id + 'Duration').fadeOut(400, function(){
      $(this).text(id_benzo.duration).fadeIn(600);
    })
  } else {
    $('#' + id + 'Duration').fadeOut(400, function(){
    $(this).text('No duration available')
    }).fadeIn(600); 
  }
  if (id_benzo.aftereffects !== undefined) {
    $('#' + id + 'Aftereffects').fadeOut(400, function(){
      $(this).text(id_benzo.aftereffects)
    }).fadeIn(600);
  } else {
    $('#' + id + 'Aftereffects').fadeOut(400, function(){
    $(this).text('No aftereffects available')
    }).fadeIn(600);
  }
  if (id_benzo.doseLight !== undefined) {
    $('#' + id + 'DoseLow').fadeOut(400, function(){
      $(this).text('Light: ' + id_benzo.doseLight)
    }).fadeIn(600);
  } else if (id_benzo.doseLow !== undefined) {
    $('#' + id + 'DoseLow').fadeOut(400, function(){
      $(this).text('Light: ' + id_benzo.doseLow)
    }).fadeIn(600);
  } else {
    $('#' + id + 'DoseLow').fadeOut(400);
  }
  if (id_benzo.doseCommon !== undefined) {
    $('#' + id + 'DoseCommon').fadeOut(400, function(){
      $(this).text('Common: ' + id_benzo.doseCommon)
    }).fadeIn(600);
  } else {
    $('#' + id + 'DoseCommon').fadeOut();
  }
  if (id_benzo.doseStrong !== undefined) {
    $('#' + id + 'DoseStrong').fadeOut(400, function(){
      $(this).text('Strong: ' + id_benzo.doseStrong)
    }).fadeIn(1000);
  } else {
    $('#' + id + 'DoseStrong').fadeOut(400);
  }
  if (id_benzo.doseHeavy !== undefined) {
    $('#' + id + 'DoseHeavy').fadeOut(400, function(){
      $(this).text('Heavy: ' + id_benzo.doseHeavy)
    }).fadeIn(1000);
  } else {
    $('#' + id + 'DoseHeavy').fadeOut(400);
  }
  if (id_benzo.doseHeavy !== undefined && id_benzo.doseStrong !== undefined && id_benzo.doseCommon !== undefined && id_benzo.doseLight !== undefined && id_benzo.doseLow !== undefined) {
    $('#' + id + 'DoseLow').fadeOut(400, function(){
      $(this).text('No information available')
    }).fadeIn(600);
  }
};

$(document).on('keyup keypress', 'form input[type="text"]', function(e) {
  if (e.which == 13) {
    e.preventDefault();
    return false;
  }
});

// Round the result off
Number.prototype.round = function(places) {
  return +(Math.round(this + 'e+' + places) + 'e-' + places);
};

// Calculate the difference in dose and run functions to change info shown
function calculate() {
  var input = document.getElementById('select2-inputSubstance-container');
  var output = document.getElementById('select2-outputSubstance-container');
  var selectedTextInput = input.title;
  var selectedTextOutput = output.title;
  var selectedLowCaseTextInput = selectedTextInput.toLowerCase();
  var selectedLowCaseTextOutput = selectedTextOutput.toLowerCase();
  var calc;
  
  calc = parseFloat(document.calcform.dose.value) /
    parseFloat(document.calcform.inputSubstance.options[
      document.calcform.inputSubstance.selectedIndex].value) *
    parseFloat(document.calcform.outputSubstance.options[
      document.calcform.outputSubstance.selectedIndex].value);
  // Ignore anything not a number
  if (isNaN(calc)) {
    return;
  }
  // Append benzo + start dose to the list-group
  $('#inputDoseResult').text(parseFloat(document.calcform.dose.value));

  // Calculate new dose
  $('#outputDoseResult').text(calc.round(2));
}

function newInput() {
  calculate();
  appendData('input');
}

function newOutput() {
  calculate();
  appendData('output');
}