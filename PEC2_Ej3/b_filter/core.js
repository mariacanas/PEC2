
//Función que devuelve un array con solo los numeros pares
function onlyEven(array) {
  return array.filter(n=>n%2==0);
}

//Función que devuelve los string que no tienen espacios entre las palabras
function onlyOneWord(array) {
  return array.filter(c=>!c.includes(' '));
}

//Devuelve un array con las filas que está formadas solo por números positivos
function positiveRowsOnly(array) {
  return array.filter(row=> row.every(n=>n>0));
}

//Devuelve un array con los string que tienen una única vocal y esa es la misma
function allSameVowels(array) {
  const vocales = ['a','e','i','o','u'];
  return array.filter(n=>{
    const palabra = new Set([...n.toLowerCase()].filter(c=>vocales.includes(c)));
    return palabra.size === 1;
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
