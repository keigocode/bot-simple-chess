let k = 1000;
let m = 1000000;
let b = 1000000000;
let t = 1000000000000;
let superNumber = 1000000000000000;

function number(str){
	str = String(str);
  if (str.length > 1000) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(k|m|b|t|super)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || '').toLowerCase();
  switch (type) {
    case 'super':
      return n * superNumber;
    case 't':
      return n * t;
    case 'b':
      return n * b;
    case 'm':
      return n * m;
    case 'k':
      return n * k;
    default:
      return n;
  }
}

function getNumber(FloatNumber) {
  let msAbs = Math.abs(FloatNumber);
  if(msAbs >= superNumber){
    return (FloatNumber / superNumber).toFixed(5) + ' SUPER'
  }
  if(msAbs >= t){
    return (FloatNumber / t).toFixed(2) + ' T'
  }
  if (msAbs >= b) {
    return (FloatNumber / b).toFixed(2) + ' B';
  }
  if (msAbs >= m) {
    return (FloatNumber / m).toFixed(2) + ' M';
  }
  if (msAbs >= k) {
    return (FloatNumber / k).toFixed(2) + ' K';
  }
  return FloatNumber;
}

function getNumberStyle(FloatNumber){
  let abs = Math.abs(FloatNumber);
  let digits = String(FloatNumber).length;
  let numberToStyled = String(FloatNumber);
  let typeArray = numberToStyled.split("");
  let numberStyled = "";
  let count = 0;
  typeArray.forEach((element, i, array) => {
    count++;
    numberStyled = `${array[array.length - 1 - i]}${numberStyled}`;
    if(i == array.length - 1) return; 
    if(count == 3){
      numberStyled = `,${numberStyled}`;
      count = 0;
    }
  })

  return numberStyled;
}

module.exports = {number, getNumber, getNumberStyle};