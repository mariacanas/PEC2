
//Me devuelve un array con los valores multiplicados por 10
function multiplyBy10(array) {
  return (array.map(n=>n*10));
}

//Devuelve el array pero desplazado una posicion a la derecha
function shiftRight(array) {
  const lastElement = array.pop();
  array.unshift(lastElement);
  return array;
}

//Me devuelve el array de cadenas que se le ha pasado pero solo las vocales de cada uno de los string, para ello me va a reemplazar todos los caracteres
//que no son vocales a cadena vacia
function onlyVowels(array) {
  return array.map(str => str.replace(/[^aeiouAEIOU]/g, ''));
}

//Funcion que duplica cada elemento de la matriz
function doubleMatrix(array) {
  return array.map(dm=> dm.map(d=>d*2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
