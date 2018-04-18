/* Class that takes a 2d array and checks if the values within would solve a sudoku problem
	Is the matrix nxn
	Are all the values within between 1-9
	Does each row and column hold values of 1-9 with no duplicates 
*/

var sudokuRows = [	
					[4,3,5,2,6,9,7,8,1], 
				  	[6,8,2,5,7,1,4,9,3], 
				  	[1,9,7,8,3,4,5,6,2], 
				  	[8,2,6,1,9,5,3,4,7],
				  	[3,7,4,6,8,2,9,1,5],
				  	[9,5,1,7,4,3,6,2,8],
				  	[5,1,9,3,2,6,8,7,4],
				  	[2,4,8,9,5,7,1,3,6],
				  	[7,6,3,4,1,8,2,5,9]
];

var sudokuValidator = {
	isValueWithinRange(rowEntry, minimumValue, maximumValue){
		return (rowEntry >= minimumValue && rowEntry <= maximumValue);
	},
	isAnInteger(rowEntry){
		return !isNaN(rowEntry);
	},
	isAcceptableValue(rowEntry){
		return this.isValueWithinRange(rowEntry, 1, 9) && this.isAnInteger(rowEntry);
	},
	matrixHasCorrectDimensions(sudokuArray, numberOfRows){
		var correctDimensions = true;
		if(!sudokuArray.length === numberOfRows){
			correctDimensions = false;
			sudokuArray.map(function(columnValues){
				if(!columnValues.length === numberOfRows){
					correctDimensions = false;
				}
			});
		}
		return correctDimensions;
	},
	allNumbers(sudokuRows){	
		var correctlyFormattedNumbers = true;
		sudokuRows.map(function(row){
			row.map(function(column){
				if(!sudokuValidator.isAcceptableValue(column)){
					correctlyFormattedNumbers = false;
				}
			})
		});
		return correctlyFormattedNumbers;
	},
	valueInArray(value, arrOfVals){
		return arrOfVals.includes(value);
	},
	rowHasDuplicateValue(rowOfNumbers){
		var hasDuplicates = false;
		var uniqueNumbers = [];

		for(var x of rowOfNumbers){
			if(!this.valueInArray(x, uniqueNumbers)){
				uniqueNumbers.push(x);
			}else{
				hasDuplicates = true;
			}
		}
		return hasDuplicates;
	},
	rowsCorrect(sudokuRows){
		var rowsArePermitted = true;
		sudokuRows.map(function(row){
			if(sudokuValidator.rowHasDuplicateValue(row)){
				rowsArePermitted = false;
			}
		});
		return rowsArePermitted;
	},
	transposeColumnsToRows(sudokuRows) {
	    return Object.keys(sudokuRows[0])
	        .map(colNumber => sudokuRows.map(rowNumber => rowNumber[colNumber]));
	},
	columnsCorrect(sudokuRows){
		return this.rowsCorrect(this.transposeColumnsToRows(sudokuRows));
	},
	rowsAndColumnsCorrect(sudokuRows){
		return this.rowsCorrect(sudokuRows) && this.columnsCorrect(sudokuRows);
	},
	isACorrectSolution(sudokuRows, noRows){
		return this.matrixHasCorrectDimensions(sudokuRows, noRows) && this.allNumbers(sudokuRows) && this.rowsAndColumnsCorrect(sudokuRows);
	}

}

console.log(sudokuValidator.isACorrectSolution(sudokuRows, 9));


/* Questions to be answered - 
Why cant I use this.functionName within Map
Why can't i use a break point/ how can I break the loop
*/



