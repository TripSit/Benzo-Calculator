window.onload = function () {
  var outputArray = [
    { value: 0.5, name: 'Alprazolam' },
    { value: 1, name: 'Ativan' },
    { value: 5.5, name: 'Bromazepam' },
    { value: 15, name: 'Centrax' },
    { value: 20, name: 'Clobazam' },
    { value: 0.5, name: 'Clonazepam' },
    { value: 15, name: 'Clorazepate' },
    { value: 23, name: 'Calmane' },
    { value: 10, name: 'Diazepam' },
    { value: 20, name: 'Doral' },
    { value: 1.5, name: 'Dormonoct' },
    { value: 1.5, name: 'Estazolam' },
    { value: 1, name: 'Etizolam' },
    { value: 1, name: 'Flunitrazepam' },
    { value: 23, name: 'Flurazepam' },
    { value: 20, name: 'Halazepam' },
    { value: 0.5, name: 'Halcion' },
    { value: 23, name: 'Ketazolam' },
    { value: 0.5, name: 'Klonopin' },
    { value: 5.5, name: 'Lexotan' },
    { value: 25, name: 'Librium' },
    { value: 1.5, name: 'Loprazolam' },
    { value: 1, name: 'Lorazepam' },
    { value: 1.5, name: 'Lormetazepam' },
    { value: 10, name: 'Medazepam' },
    { value: 10, name: 'Mogadon' },
    { value: 10, name: 'Nitrazepam' },
    { value: 1.5, name: 'Noctamid' },
    { value: 10, name: 'Nordazepam' },
    { value: 1.5, name: 'Nuctalon' },
    { value: 20, name: 'Oxazepam' },
    { value: 20, name: 'Paxipam' },
    { value: 15, name: 'Prazepam' },
    { value: 1.5, name: 'ProSom' },
    { value: 20, name: 'Quazepam' },
    { value: 20, name: 'Restoril' },
    { value: 1, name: 'Rohypnol' },
    { value: 20, name: 'Serax' },
    { value: 20, name: 'Temazepam' },
    { value: 0.5, name: 'Triazolam' },
    { value: 10, name: 'Valium' },
    { value: 0.5, name: 'Xanax' },
  ];

  var selectOutput = document.getElementById('outputSubstance');
  for (i = 0; i < outputArray.length; i++) {
    selectOutput.options[selectOutput.options.length] = new Option(outputArray[i].name,
      outputArray[i].value);
  }

  var selectInput = document.getElementById('inputsubstance');
  for (i = 0; i < outputArray.length; i++) {
    selectInput.options[selectInput.options.length] = new Option(outputArray[i].name,
      outputArray[i].value);
  }
};

Number.prototype.round = function (places) {
  return +(Math.round(this + 'e+' + places) + 'e-' + places);
};

function calculate() {
  var t = document.getElementById('outputSubstance');
  var selectedText = t.options[t.selectedIndex].text;
  var calc;
  calc = parseFloat(document.calcform.dose.value) /
parseFloat(document.calcform.inputSubstance.options[
  document.calcform.inputSubstance.selectedIndex].value) *
parseFloat(document.calcform.outputSubstance.options[
  document.calcform.outputSubstance.selectedIndex].value);
  document.calcform.resultOutput.value = calc.round(2);
  var paragraph = document.getElementById('outputName');
  paragraph.textContent = selectedText;
}
