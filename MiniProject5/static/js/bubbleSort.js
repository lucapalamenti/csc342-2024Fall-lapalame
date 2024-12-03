

export default {
    /**
     * Uses a bubblesort algorithm to sort an array of objects given a key to compare
     * the objects to eachother
     * 
     * @param { Array<any> } list the array of objects to be sorted
     * @param { String } compareKey the name of the key that the objects should be compared with
     * @returns the sorted list
     */
    bubbleSortObjects: ( list, compareKey ) => {
        let i, k, temp;
        for ( i = 0; i < list.length - 1; i++ ) {
            for ( k = 0; k < list.length - i - 1; k++ ) {
                // If a and b need to be swapped
                //console.log( list[ k ][ compareKey ], " compared to ", list[ k + 1 ][ compareKey ], " is ", list[ k ][ compareKey ] > list[ k + 1 ][ compareKey ]);
                if ( list[ k ][ compareKey ] > list[ k + 1 ][ compareKey ] ) {
                    temp = list[ k ];
                    list[ k ] = list[ k + 1 ];
                    list[ k + 1 ] = temp;
                }
            }
        }
        return list;
    },

    /**
     * Uses a bubblesort algorithm to sort an array of objects  in reverse order 
     * given a key to compare the objects to eachother
     * 
     * @param { Array<any> } list the array of objects to be sorted
     * @param { String } compareKey the name of the key that the objects should be compared with
     * @returns the sorted list
     */
    bubbleSortObjectsReverse: ( list, compareKey ) => {
        let i, k, temp;
        for ( i = 0; i < list.length - 1; i++ ) {
            for ( k = 0; k < list.length - i - 1; k++ ) {
                // If a and b need to be swapped
                //console.log( list[ k ][ compareKey ], " compared to ", list[ k + 1 ][ compareKey ], " is ", list[ k ][ compareKey ] > list[ k + 1 ][ compareKey ]);
                if ( list[ k ][ compareKey ] < list[ k + 1 ][ compareKey ] ) {
                    temp = list[ k ];
                    list[ k ] = list[ k + 1 ];
                    list[ k + 1 ] = temp;
                }
            }
        }
        return list;
    }
}