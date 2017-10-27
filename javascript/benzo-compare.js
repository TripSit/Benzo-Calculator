function calculate() {
  var t = document.getElementById('substanceType');
  var selectedText = t.options[t.selectedIndex].text;
  var calc;
  calc = parseFloat(document.calcform.dose.value) /
parseFloat(document.calcform.inputSubstance.options[
  document.calcform.inputSubstance.selectedIndex].value) *
parseFloat(document.calcform.outputSubstance.options[
  document.calcform.outputSubstance.selectedIndex].value);
  document.calcform.resultOutput.value = calc;
  document.calcform.outputName.value = selectedText;
}
