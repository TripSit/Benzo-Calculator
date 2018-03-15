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
  
  let checkArrayName = function (name, array) {
    if (array['formatted_dose'][name] != undefined) {
    benzoProperties.doseLight = array['formatted_dose'][name]['Light'];
    benzoProperties.doseLow = array['formatted_dose'][name]['Low'];
    benzoProperties.doseCommon = array['formatted_dose'][name]['Common'];
    benzoProperties.doseHeavy = array['formatted_dose'][name]['Heavy'];
    benzoProperties.doseStrong = array['formatted_dose'][name]['Strong'];
    }
  };
  
  checkArrayName('Oral', a);
  checkArrayName('none', a);
  checkArrayName('Light:', a);
  
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

 // Add text info to the two input-groups.

var benzoText = function(benzoId, textName, id) {
    if (benzoId !== undefined) {
    $('#' + id + textName).text('').fadeOut(400, function(){
      $(this).text(benzoId)
    }).fadeIn(600);
    } else {
      $('#' + id + textName).fadeOut(400, function(){
      $(this).text('No ' + textName.toLowerCase() + ' available')
      }).fadeIn(600); 
    }
};

// Add dossage info to the two input-groups.

var benzoDose = function(benzoId,doseId, doseName, id) {
    if (benzoId !== undefined) {
    $('#' + id + doseId).fadeOut(400, function(){
      $(this).text(doseName + ': ' + benzoId)
    }).fadeIn(600);
    } else {
      $('#' + id + doseId).fadeOut();
    }
};

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
 
  // Add text info to the two input-groups.
  benzoText(id_benzo.summary, 'Summary', id);
  benzoText(id_benzo.effects, 'Effects', id);
  benzoText(id_benzo.duration, 'Duration', id);
  benzoText(id_benzo.aftereffects, 'Aftereffects', id);
  // Add dossage info to the two input-groups.
  benzoDose(id_benzo.doseLight || id_benzo.doseLow, 'DoseLow', 'Light', id);
  benzoDose(id_benzo.doseCommon, 'DoseCommon', 'Common', id);
  benzoDose(id_benzo.doseStrong, 'DoseStrong', 'Strong', id);
  benzoDose(id_benzo.doseHeavy, 'DoseHeavy', 'Heavy', id);
  // If no dosage available 
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