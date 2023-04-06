/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n, allSolutions) {
  // declare solution array to hold solutions
  var solution = [];

  // create an empty board
  var identityBoard = new Board({n: n});
  // add pieces along major major Diagonal**
  for (var i = 0; i < n; i++) {
    identityBoard.togglePiece(i, i);
  }
  // write buildBoard helper funciton
  var buildBoard = function (builderBoard) {
    // with no params, builderBoard = [] otherwise is argument passed
    var builderBoard = builderBoard || [];
    // if builder.length === n, check for validity; if valid push to solutions array
    if (builderBoard.length === n) {
      var solutionBoard = new Board(builderBoard);
      if (!solutionBoard.hasAnyRooksConflicts()) {
        solution.push(builderBoard);
      }
      return;
    } else {
    // else solutionsSpaceBoard.forEach with buildBoard(builderBoard.push(currentRow))
      identityBoard.rows().forEach(function (row) {
        // builderBoard.concat([row]);
        if (!builderBoard.includes(row)) {
          buildBoard(builderBoard.concat([row]));
        }
      });
    }

  };

  buildBoard();

  // possibly return random solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution[0]));
  return allSolutions ? solution : solution[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = findNRooksSolution(n, true).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, allSolutions) {
  // declare solution array to hold solutions
  var solution = [];

  // if (n === 2 || n === 3) {
  //   return new Board({n: n}).rows();
  // }

  // create an empty board
  var identityBoard = new Board({n: n});
  // add pieces along major major Diagonal**
  for (var i = 0; i < n; i++) {
    identityBoard.togglePiece(i, i);
  }
  // write buildBoard helper funciton
  var buildBoard = function (builderBoard) {
    // with no params, builderBoard = [] otherwise is argument passed
    var builderBoard = builderBoard || [];
    // if builder.length === n, check for validity; if valid push to solutions array
    if (builderBoard.length === n) {
      var solutionBoard = new Board(builderBoard);
      if (!solutionBoard.hasAnyQueensConflicts()) {
        solution.push(builderBoard);
      }
      return;
    } else {
    // else solutionsSpaceBoard.forEach with buildBoard(builderBoard.push(currentRow))
      identityBoard.rows().forEach(function (row) {
        // builderBoard.concat([row]);
        if (!builderBoard.includes(row)) {
          buildBoard(builderBoard.concat([row]));
        }
      });
    }

  };

  buildBoard();

  // possibly return random solution
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return allSolutions ? solution : solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolution(n, true).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
