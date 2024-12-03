const array1 = [1, 2, 3, 4, 5];

// TASK 1: Functional Array Iteration

function printArray( arr ) {
    arr.forEach(element => {
        console.log(`The value at position ${arr.indexOf( element )} is ${element}` );
    });
}

printArray(array1);


// TASK 2: Operating on Array Elements

let squareArray = ( arr ) => {
    return arr.map( (num) => {
        return num * num;
    });
};

console.log(squareArray(array1));


// TASK 3: Filtering Array Elements

function filterArray( arr ) {
    return arr.filter((val) => {
        return ( val % 2 ) == 0;
    })
}

console.log(filterArray(array1));


// TASK 4: Reducing Arrays

let sumArray = ( arr ) => {
    return arr.reduce(
        ( sum, val ) => sum + val, 0
    );
}

console.log(sumArray(array1));


// TASK 5: Chaining Array Methods

function chainArray( arr ) {
    let arr2 = arr.filter((val) => {
        return ( val % 2 ) == 0;
    })
    return arr2.reduce(
        ( sum, val ) => sum + val * val, 0
    );
}

console.log(chainArray(array1));

// BONUS
for ( let i = 0; i <= 6; i++ ) {
    console.log( `array1.includes( ${i} ) is ${array1.includes( i )}` );
}

console.log( array1.find(( element ) => element > 3 ) );
console.log( array1.find(( element ) => element % 4 == 0 ) );
console.log( array1.find(( element ) => element * element > 10 ) );

console.log( array1.findIndex(( element ) => element > 3 ) );
console.log( array1.findIndex(( element ) => element % 4 == 0 ) );
console.log( array1.findIndex(( element ) => element * element > 10 ) );

console.log( array1.some(( element ) => { return element * element == 25 } ) );
console.log( array1.some(( element ) => { return element > 3 } ) );
console.log( array1.some(( element ) => { return element > 10 } ) );

console.log( array1.every(( element ) => { return element * element == 25 } ) );
console.log( array1.every(( element ) => { return element > 3 } ) );
console.log( array1.every(( element ) => { return element > 0 } ) );