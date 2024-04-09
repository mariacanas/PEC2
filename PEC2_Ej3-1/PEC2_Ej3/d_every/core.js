// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  return input.every(n=>n%2===0);
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  return input.every(i=>typeof i === typeof(input[0]));
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  return input.every(row=>Array.isArray(row) && (row.every(n=>n>=0)));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.


function allSameVowels(input) {
  return input.every(item => {
   
    const vowels = item.match(/[aeiou]/gi);
    if (!vowels || new Set(vowels).size !== 1) {
      return false;
    }

    return true;
  });
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
