// ads

var conversionType = "L2S";
var resultValue = "---";
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function update() {
  var insertedValue = document.getElementById("result").innerHTML = document.getElementById("value").value;

  if (conversionType == "S2L") {
    resultValue = convertS2L(insertedValue);
  } else {
    resultValue = convertL2S(insertedValue);
  }

  if (insertedValue === "" || insertedValue == null) {
    document.getElementById("result").innerHTML = "---";
  }
  else if (resultValue) {
    document.getElementById("result").innerHTML = resultValue;
  } else {
    document.getElementById("result").innerHTML = "---";
  }
}

function convertL2S(insertedValue) {
  var valLength = insertedValue.length;

  var numbersPart = insertedValue.slice(0, valLength-2);
  var letter1 = insertedValue.slice(valLength-2, valLength-1);
  var letter2 = insertedValue.slice(valLength-1, valLength);

  var exp1 = 26*3*alphabetPosition(letter1);
  var exp2 = 3*alphabetPosition(letter2);

  var adjust = 0;
  while (numbersPart > 10) {
    numbersPart = numbersPart/10;
    adjust++;
  }

  var finalExp = exp1 + exp2 + adjust + 15;

  return numbersPart + "e" + finalExp;
}

function convertS2L(insertedValue) {
  var expIndex = insertedValue.indexOf('e');

  if (expIndex == -1) {
    return "---";
  }

  var base = insertedValue.slice(0, expIndex);
  var exp = insertedValue.slice(expIndex+1, insertedValue.length);

  if (exp < 15) {
    if (exp >= 12) {
      return base * Math.pow(10,exp-12) + "T";
    } else if (exp >= 9) {
      return base * Math.pow(10,exp-9) + "B";
    } else if (exp >= 6) {
      return base * Math.pow(10,exp-6) + "M";
    } else if (exp >= 3) {
      return base * Math.pow(10,exp-3) + "K";
    } else return base * Math.pow(10,exp);
  }

  exp -= 15;

  var letter1 = 0;
  letter1 = Math.floor(exp/(26*3));
  exp -= letter1 * 26*3;

  var adjust = 0;
  while (exp%3 > 0) {
    adjust++;
    exp--;
  }

  exp /= 3;
  if (exp == 26) {
    letter1++;
    exp = 0;
  }

  return base*Math.pow(10,adjust) + alphabet[letter1] + alphabet[exp];
}

function alphabetPosition(letter) {
  return alphabet.indexOf(letter);
}

function setConversionType(){
  conversionType = document.querySelector('input[name="optradio"]:checked').value;
  update();
}
