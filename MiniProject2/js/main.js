let num1 = "0", num2 = "0";
let num1hasDecimal = false, num2hasDecimal = false;

let states = {
    ZERO : 0,
    ONE_NUMBER : 1,
    OPERATION : 2,
    TWO_NUMBERS : 3,
    ERROR : 4
};
let state = states.ZERO;

let operations = {
    ADD : {
        method : add,
        symbol : '+'
    },
    SUBTRACT : {
        method : subtract,
        symbol : '-'
    },
    MULTIPLY : {
        method : multiply,
        symbol : 'x'
    },
    DIVIDE : {
        method : divide,
        symbol : '/'
    },
    NONE : null
}
let operation = operations.NONE;

let textBox = document.querySelector( "#header" );
let keypad = document.querySelector( "#keypad" );
let historyBox = document.querySelector( "#history" );

keypad.addEventListener( 'click', ( element ) => {
    if ( element.target.id === "pm-button" ) {
        plusMinusPress();
    } else if ( element.target.id === "decimal-button" ) {
        decimalPress();
    } else if ( element.target.id === "enter-button" ) {
        doOperation();
    } else if ( element.target.id === "clear-button" ) {
        clearMain();
    } else if ( element.target.id === "clear-history" ) {
        clearHistory();
    } else if ( element.target.className === "operation-button" ) {
        performOperation( element.target.value );
    } else if ( element.target.classList.contains( "number-button" ) ) {
        numberPress ( element.target.value );
    }
});

document.querySelector( "#clear-history" ).addEventListener( 'click', ( element ) => {
    clearHistory();
});

function numberPress( value ) {
    switch ( state ) {
        case states.ZERO:
            if ( lastCharIsDecimal() ) {
                num1 = "0." + value;
                textBox.innerHTML = num1;
                state = states.ONE_NUMBER
            } else if ( value !== 0 ) {
                num1 = `${value}`;
                textBox.innerHTML = num1;
                state = states.ONE_NUMBER
            }
            break;
        case states.ONE_NUMBER:
            if ( lastCharIsDecimal() ) {
                num1 = num1 + ".";
            }
            num1 = num1 + `${value}`;
            textBox.innerHTML = num1;
            break;
        case states.OPERATION:
            if ( value !== 0 ) {
                num2 = `${value}`;
                textBox.innerHTML = textBox.innerHTML + `${value}`;
                state = states.TWO_NUMBERS
            }
            break;
        case states.TWO_NUMBERS:
            if ( lastCharIsDecimal() ) {
                num2 = num2 + ".";
            }
            num2 = num2 + `${value}`;
            textBox.innerHTML = textBox.innerHTML + `${value}`;
            break;
        case states.ERROR:
            // DO NOTHING
            break;
    }
}

function decimalPress() {
    switch ( state ) {
        case states.ZERO:
            // If the 0 doesn't already have a decimal, add one
            if ( !num1hasDecimal ) {
                num1hasDecimal = true;
                textBox.innerHTML = num1 + ".";
            }
            break;
        case states.ONE_NUMBER:
            // If the number doesn't already have a decimal, add one
            if ( !num1hasDecimal ) {
                num1hasDecimal = true;
                textBox.innerHTML = num1 + ".";
            }
            break;
        case states.OPERATION:
            if ( !num2hasDecimal ) {
                num2hasDecimal = true;
                textBox.innerHTML = textBox.innerHTML + "0.";
                state = states.TWO_NUMBERS;
            }
            textBox.inerHTML = textBox.inerHTML + "0.";
            break;
        case states.TWO_NUMBERS: // 9+1.
            if ( !num2hasDecimal ) {
                textBox.innerHTML = textBox.innerHTML + ".";
            }
            break;
        case states.ERROR:
            // DO NOTHING
            break;
    }
}

function performOperation( o ) {
    switch ( state ) {
        case states.ZERO:
            setOperation( o );
            textBox.innerHTML = num1 + operation.symbol;
            state = states.OPERATION;
            break;
        case states.ONE_NUMBER:
            setOperation( o );
            textBox.innerHTML = num1 + operation.symbol;
            state = states.OPERATION;
            break;
        case states.OPERATION:
            setOperation( o );
            textBox.innerHTML = num1 + operation.symbol;
            break;
        case states.TWO_NUMBERS:
            doOperation();
            if ( state !== states.ERROR ) {
                setOperation( o );
                textBox.innerHTML = num1 + operation.symbol;
                state = states.OPERATION;
            }
            break;
        case states.ERROR:
            // DO NOTHING
            break;
        default:
            console.log( "INVALID STATE" );
    }  
}

function setOperation( o ) {
    switch ( o ) {
        case '+':
            operation = operations.ADD;
            break;
        case '-':
            operation = operations.SUBTRACT;
            break;
        case '*':
            operation = operations.MULTIPLY;
            break;
        case '/':
            operation = operations.DIVIDE;
            break;
        default:
            console.error( "UNKNOWN OPERATION" );
            break;
    }
}

/* Performs the desired operation */
function doOperation() {
    if ( operation !== operations.NONE && num2 !== "0" && state !== states.OPERATION ) {
        num1 = "" + Math.round( operation.method( num1, num2 ) * 1000000 ) / 1000000;
        num2 = "0";
        if ( isNaN( num1 ) || !isFinite( num1 ) ) {
            num1 = "0";
            textBox.innerHTML = "Error";
            state = states.ERROR;
        } else {
            textBox.innerHTML = num1;
            if ( Number( num1 ) % 1 == 0 ) {
                num1hasDecimal = false;
            }
            num2hasDecimal = false;
            if ( num1 == 0 ) {
                state = states.ZERO;
            } else {
                state = states.ONE_NUMBER;
            }
            operation = operations.NONE;
        }
        const p = document.createElement( "p" );
        p.innerHTML = num1;
        historyBox.insertBefore( p, historyBox.firstChild );
    }
}

/* Adds a and b together */
function add( a, b ) {
    a = Number( a );
    b = Number( b );
    let divisor = 1;
    // If a or b has a decimal
    while ( a % 1 !== 0 || b % 1 !== 0 ) {
        a *= 10;
        b *= 10;
        divisor *= 10;
    }
    return ( a + b ) / divisor;
}
/* Subtracts b from a */
function subtract( a, b ) {
    a = Number( a );
    b = Number( b );
    let divisor = 1;
    // If a or b has a decimal
    while ( a % 1 !== 0 || b % 1 !== 0 ) {
        a *= 10;
        b *= 10;
        divisor *= 10;
    }
    return ( a - b ) / divisor;
}
/* Multiplies a and b together */
function multiply( a, b ) {
    return a * b;
}
/* Divides a by b */
function divide( a, b ) {
    return a / b;
}

/* Switches the sign of the value in the textbox if it is a single number */
function plusMinusPress() {
    switch ( state ) {
        case states.ONE_NUMBER:
            if ( num1[ 0 ] == '-' ) {
                num1 = num1.substring( 1 );
            } else {
                num1 = "-" + num1;
            }
            textBox.innerHTML = num1;
            break;
        default:
            // For all aother states we do nothing
            break;
    }
}

/* Determines if the last character in the input box is a decimal or not */
function lastCharIsDecimal() {
    return textBox.innerHTML[ textBox.innerHTML.length - 1 ] == '.';
}

/* Resets the input of the calculator */
function clearMain() {
    num1 = "0";
    num1hasDecimal = false;
    num2 = "";
    num2hasDecimal = false;
    textBox.innerHTML = num1;
    state = states.ZERO;
}

/* Clears the history tab */
function clearHistory() {
    while ( historyBox.childElementCount !== 0 ) {
        historyBox.removeChild( historyBox.firstChild );
    }
}

historyBox.addEventListener( 'click', ( element ) => {
    if ( element.target.nodeName === 'P' ) {
        switch ( state ) {
            case states.ZERO:
                num1 = element.target.innerHTML;
                textBox.innerHTML = num1;
                num1hasDecimal = Number( num1 ) % 1 !== 0;
                state = states.ONE_NUMBER;
                break;
            case states.ONE_NUMBER:
                break;
            case states.OPERATION:
                num2 = element.target.innerHTML;
                textBox.innerHTML = num1 + operation.symbol + num2;
                num2hasDecimal = Number( num2 ) % 1 !== 0;
                state = states.TWO_NUMBERS;
                break;
            case states.TWO_NUMBERS:
                break;
            case states.ERROR:
                // DO NOTHING
                break;
        }
    }
});

/* Changes the background theme */
function changeTheme( path ) {
    document.querySelectorAll( '.blackboard-bg' ).forEach(element => {
        element.style.backgroundImage = `url("${path}")`;
    });
}

document.addEventListener('mousedown', ( e ) => {
    e.preventDefault();
});

document.addEventListener('keyup', ( key ) => {
    let k = key.key;
    // Keypress is a number
    if ( /^[\d]$/.test( k ) ) {
        numberPress( k );
    // Keypress is a decimal
    } else if ( k === '.' ) {
        decimalPress();
    // Keypress is an operation
    } else if ( /^[+|\-|*|/]$/.test( k ) ) {
        performOperation( k );
    // Alternate way to enter the multiplication operation
    } else if ( k === 'x' ) {
        performOperation( '*' );
    // Keypress is the enter button
    } else if ( k === 'Enter' ) {
        key.preventDefault();
        doOperation();
    // Keypress is the c button
    } else if ( k === 'c' ) {
        clearMain();
    }
});
