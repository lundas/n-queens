// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // this.get(rowIndex) to grab desired row
      var thisRow = this.get(rowIndex);

      // call reduce on row to sum values
      var sumOfRow = _.reduce(thisRow, function (acc, value) {
        return acc += value;
      }, 0);

      // if sum > 1, return true, else return false
      if (sumOfRow > 1) {
        return true;
      } else {
        return false;
      }

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasCoflict = false;
      // rows = this.rows
      var rows = this.rows();
      // for row in rows, call hasRowConflictAt
      for (var i = 0; i < rows.length; i++) {
        hasConflict = this.hasRowConflictAt(i);
        if (hasConflict) {
          return hasConflict;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // get rows
      var rows = this.rows();

      // call reduce on all rows at colIndex
      var sumOfCol = _.reduce(rows, function (acc, value) {
        return acc += value[colIndex];
      }, 0);

      // if sum > 1 return true, else return false
      if (sumOfCol > 1 ) {
        return true;
      } else {
        return false;
      }

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        hasConflict = this.hasColConflictAt(i);
        if (hasConflict) {
          return hasConflict;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      // var rowIndex = 0;
      // var colIndex = majorDiagonalColumnIndexAtFirstRow;

      // special case: majorDiagonalColumnIndexAtFirstRow = 0
      // starting at (0, 0) sum all values incrementing (r, c) by 1 until either equals n - 1
      // then increment r in (r, 0) and get new sum of values until r = n - 2
      // if sum > 1 return true
      // else return false
      if (majorDiagonalColumnIndexAtFirstRow === this.attributes.n - 1) {
        return false;
      } else if (majorDiagonalColumnIndexAtFirstRow === 0) {
        for (var i = 0; i < this.attributes.n - 1; i++) {
          var colIndex = majorDiagonalColumnIndexAtFirstRow;
          var sumOfDiagonal = _.reduce(rows.slice(i), function(acc, value) {
            acc += value[colIndex];
            colIndex++;
            return acc;
          }, 0);
          if (sumOfDiagonal > 1) {
            return true;
          }
        }
      } else if (majorDiagonalColumnIndexAtFirstRow > 0 && majorDiagonalColumnIndexAtFirstRow < this.attributes.n - 1) {
      // other case: majorDiagonalColumnIndexAtFirstRow = some other number
      // start at (0, majorDiagonalColumnIndexAtFirstRow) sum all values incrementing (r, c) by 1 until either equals n - 1
        var colIndex = majorDiagonalColumnIndexAtFirstRow;
        var sumOfDiagonal = _.reduce(rows.slice(0, (this.attributes.n - majorDiagonalColumnIndexAtFirstRow)), function(acc, value) {
          acc += value[colIndex];
          colIndex++;
          return acc;
        }, 0);
        // if sum > 1 return true
        if (sumOfDiagonal > 1) {
          return true;
        }

      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var hasConflict = false;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        hasConflict = this.hasMajorDiagonalConflictAt(i);
        if (hasConflict) {
          return hasConflict;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      // minorDiagonalColumnIndexAtFirstRow === 0
      if (minorDiagonalColumnIndexAtFirstRow === 0) {
        // return false
        return false;
      } else if (minorDiagonalColumnIndexAtFirstRow === this.attributes.n - 1) {
      // special case: minorDiagonalColumnIndexAtFirstRow = n - 1
      // start at (0, n - 1) sum all values while incrementing rows and decrementing columns
        for (var i = 0; i < this.attributes.n - 1; i++) {
          // then increment r in (r, n - 1) until r = n - 2
          var colIndex = minorDiagonalColumnIndexAtFirstRow;
          var sumOfDiagonal = _.reduce(rows.slice(i), function (acc, value) {
            acc += value[colIndex];
            colIndex--;
            return acc;
          }, 0);
          // if sum > 1 return true
          if (sumOfDiagonal > 1) {
            return true;
          }
        }

      } else if (minorDiagonalColumnIndexAtFirstRow < this.attributes.n - 1 && minorDiagonalColumnIndexAtFirstRow > 0) {
      // base case: minorDiagonalColumnIndexAtFirstRow < n - 1 && minorDiagonalColumnIndexAtFirstRow > 0
        var colIndex = minorDiagonalColumnIndexAtFirstRow;
        // start at (0, minorDiagonalColumnIndexAtFirstRow)
        var sumOfDiagonal = _.reduce(rows.slice(0, minorDiagonalColumnIndexAtFirstRow + 1), function(acc, value) {
          acc += value[colIndex];
          colIndex--;
          return acc;
        }, 0);
        if (sumOfDiagonal > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts sum all values while incrementing rows and decrementing columns
    hasAnyMinorDiagonalConflicts: function() {
      var hasConflict = false;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        hasConflict = this.hasMinorDiagonalConflictAt(i);
        if (hasConflict) {
          return hasConflict;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
