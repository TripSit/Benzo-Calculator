$(document).ready(function() {
  // Convert object into a map so it works with Select2
  var data = $.map(benzo, function (obj) {
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

});

$(document).on('keyup keypress', 'form input[type="text"]', function (e) {
  if (e.which == 13) {
    e.preventDefault();
    return false;
  }
});

Number.prototype.round = function (places) {
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
  if (isNaN(calc)) {
    return;
   }

  $('#outputDose').text(calc.round(2));
  var selectedLowCaseTextInput = selectedTextInput.toLowerCase();
  var selectedLowCaseTextOutput = selectedTextOutput.toLowerCase();
  $('#inputName').attr('href', 'http://drugs.tripsit.me/' + selectedLowCaseTextInput).text(selectedTextInput);
  $('#outputName').attr('href', 'http://drugs.tripsit.me/' + selectedLowCaseTextOutput).text(selectedTextOutput);
}
