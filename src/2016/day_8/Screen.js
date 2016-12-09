'use strict';

module.exports = class Screen {
  constructor() {
    this.screen = [];
    this.initializeScreen();
  }

  initializeScreen() {
    for (var row = 0; row < 6; row++) {
      var rowArr = [];
      for (var c = 0; c < 50; c++) {
        rowArr.push(false);
      }
      this.screen.push(rowArr);
    }
  }

  getNumberOfLitPixels() {
    return this.screen.reduce((acc, row) => {
      return acc + row.reduce((cellAcc, cell) => {
        if (cell === true) {
          return cellAcc + 1;
        } else {
          return cellAcc;
        }
      }, 0);
    }, 0);
  }

  print() {
    this.screen.forEach((row) => {
      const str = row.reduce((tempStr, cell) => {
        if (cell === true) {
          return tempStr.concat('#');
        } else {
          return tempStr.concat('.');
        }
      }, '');
      console.log(str);
    });
  }

  rect(a, b) {
    for (var row = 0; row < b; row++) {
      for (var col = 0; col < a; col++) {
        this.screen[row][col] = true;
      }
    }
  }

  rotateRow(index, rotateNumber) {
    // find the column index that the row should be rotated to
    const columnIndex = (rotateNumber) % this.screen[0].length;

    const oldRow = this.screen[index].slice();

    // move the second half of the array
    for (var i = columnIndex; i < this.screen[0].length; i++) {
      this.screen[index][i] = oldRow[i - columnIndex];
    }

    // move the first half of the array
    for (var i = 0; i < columnIndex; i++) {
      this.screen[index][i] = oldRow[oldRow.length - columnIndex + i];
    }
  }

  rotateColumn(index, rotateNumber) {
    // find the row index that the column should be rotated to
    const rowIndex = (rotateNumber) % this.screen.length;

    const oldColumn = this.screen.map((row) => {
      return row[index];
    });

    // move the first half of the array
    for (var i = 0; i < rowIndex; i++) {
      this.screen[i][index] = oldColumn[oldColumn.length - rowIndex + i];
    }

    // move the second half of the array
    for (var i = rowIndex; i < this.screen.length; i++) {
      this.screen[i][index] = oldColumn[i - rowIndex];
    }
  }
}
