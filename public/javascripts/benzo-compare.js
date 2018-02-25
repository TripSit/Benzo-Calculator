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
    width: '180px',
  });
  $('#outputSubstance').select2({
    data: data,
    width: '180px',
  });
  calculate();
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
function appendData(id, obj) {
  var output = document.getElementById('select2-outputSubstance-container');
  var input = document.getElementById('select2-inputSubstance-container');
  var selectedTextInput = input.title;
  var selectedTextOutput = output.title;
  var selectedLowCaseTextInput = selectedTextInput.toLowerCase();
  var selectedLowCaseTextOutput = selectedTextOutput.toLowerCase();
  // Decide if input data or output data
  if(obj == input){
  	var obj_benzo = find_by_pretty(benzo, selectedTextInput);
  	obj_benzo = render_pretty(obj_benzo);
  	$('#inputName').attr('href', 'http://drugs.tripsit.me/' + selectedLowCaseTextInput).text(selectedTextInput);
  } else {
	var obj_benzo = find_by_pretty(benzo, selectedTextOutput);
	obj_benzo = render_pretty(obj_benzo);
	$('#outputName').attr('href', 'http://drugs.tripsit.me/' + selectedLowCaseTextOutput).text(selectedTextOutput);
  }
  // Add correct values to the two input-groups. A bit messy due to the API
  if (obj_benzo.summary !== undefined) {
    $('#' + id + 'Summary').text(obj_benzo.summary);
  } else {
    $('#' + id + 'Summary').text('No summary available');
  }
  if (obj_benzo.effects !== undefined) {
    $('#' + id + 'Effects').text(obj_benzo.effects);
  } else {
    $('#' + id + 'Effects').text('No effects available');
  }
  if (obj_benzo.duration !== undefined) {
    $('#' + id + 'Duration').text(obj_benzo.duration);
  } else {
    $('#' + id + 'Duration').text('No duration available');
  }
  if (obj_benzo.aftereffects !== undefined) {
    $('#' + id + 'Aftereffects').text(obj_benzo.aftereffects);
  } else {
    $('#' + id + 'Aftereffects').text('No aftereffects available');
  }
  if (obj_benzo.doseLight !== undefined) {
    $('#' + id + 'DoseLow').text('Light: ' + obj_benzo.doseLight);
    $('#' + id + 'DoseLow').show();
  } else if (obj_benzo.doseLow !== undefined) {
    $('#' + id + 'DoseLow').text('Light: ' + obj_benzo.doseLow);
    $('#' + id + 'DoseLow').show();
  } else {
    $('#' + id + 'DoseLow').hide();
  }
  if (obj_benzo.doseCommon !== undefined) {
    $('#' + id + 'DoseCommon').text('Common: ' + obj_benzo.doseCommon);
    $('#' + id + 'DoseCommon').show();
  } else {
    $('#' + id + 'DoseCommon').hide();
  }
  if (obj_benzo.doseStrong !== undefined) {
    $('#' + id + 'DoseStrong').text('Strong: ' + obj_benzo.doseStrong);
    $('#' + id + 'DoseStrong').show();
  } else {
    $('#' + id + 'DoseStrong').hide();
  }
  if (obj_benzo.doseHeavy !== undefined) {
    $('#' + id + 'DoseHeavy').text('Heavy: ' + obj_benzo.doseHeavy);
    $('#' + id + 'DoseHeavy').show();
  } else {
    $('#' + id + 'DoseHeavy').hide();
  }
  if (obj_benzo.doseHeavy !== undefined && obj_benzo.doseStrong !== undefined && obj_benzo.doseCommon !== undefined && obj_benzo.doseLight !== undefined && obj_benzo.doseLow !== undefined) {
    $('#' + id + 'DoseLow').text('No information available');
    $('#' + id + 'DoseLow').show();
  }
}

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

function calculate() {
  var output = document.getElementById('select2-outputSubstance-container');
  var input = document.getElementById('select2-inputSubstance-container');
  var selectedTextInput = input.title;
  var selectedTextOutput = output.title;
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
  // Append output information
  appendData('output', output);
  // Append input information
  appendData('input', input);
}
