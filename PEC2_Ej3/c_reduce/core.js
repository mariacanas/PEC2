
//Función que suma todos los elementos del array
//El segundo parametro es 0 porque la suma de los valores del array empieza desde el valor 0
function sum(array) {
  return array.reduce((acc, subArray) => acc.concat(subArray), []).reduce((total, value) => total + value, 0);
}

//Función que multiplica todos los elementos del array
//El segundo parametro es 1 porque la multiplicación de los valores del array empieza con el valor de 1
function productAll(array) {
  return array.reduce((acc, subArray) => acc.concat(subArray), []).reduce((total, value) => total * value, 1);
 
}

//Función que transforma el array en objeto
function objectify(array) {
  return array.reduce((obj, value) => {
    obj[value[0]] = value[1];
    return obj;
  }, {});
}

//Función que muestra los numeros de la suerte de una forma mas legible, ya que lo que se le pasa es un array
function luckyNumbers(array) {
  const ar = array.reduce((arr,valuenum)=>{
    arr.push(valuenum);
    return arr;
  },[]);

   // Convierte los números en una cadena
   let luckyString = "Your lucky numbers are: ";
   for (let i = 0; i <= ar.length-1; i++) {
     
     if (i < ar.length - 1) {
       luckyString += ar[i] + ", ";
     } else {
       luckyString +=  "and " + ar[i];
     }
   }
   return luckyString;
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
