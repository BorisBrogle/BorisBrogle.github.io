/**
 * Handles the CellularAutomaton canvas
 */
class CellularAutomatonCanvas {
  rules = [ {rule: "B568/S4567", gens: 22, zeroRatio: 0.50}, // Worm like structures
            {rule: "B3/S1234", gens: 15, zeroRatio: 0.5}, // Mazectric
            {rule: "B3/S23", gens: 50, zeroRatio: 0.7}, // Conway's Life
            {rule: "B5678/S023456", gens: 10, zeroRatio: 0.50}, // Holes
            {rule: "B678/S345678", gens: 10, zeroRatio: 0.50}, // Caverns
            {rule: "B345/S4567", gens: 40, zeroRatio: 0.82}, // Assimilation
          ];
  refreshTime = 250;
  aliveColor = getComputedStyle(document.body).getPropertyValue('--cellular-automaton-alive-cells');
  deadColor = getComputedStyle(document.body).getPropertyValue('--cellular-automaton-dead-cells');
  automaton;
  canvas;
  context;
  cellSize;
  interval;
  generation;

  /**
   * @constructor
   * @param {DOM Canvas Element} canvas - Canvas on which the automaton will be drown
   * @param {Int} cellSize - Size of one cell in px
   */
  constructor(canvas, cellSize) {
    let width = Math.floor(canvas.offsetWidth/cellSize);
    let height = Math.floor(canvas.offsetHeight/cellSize);
    canvas.width = width;
    canvas.height = height;
    this.automaton = new CellularAutomaton(width, height);
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = this.fillColor;
    this.cellSize = cellSize;
    this.updateUI();
  }

  /**
   * Clears the canvas with the dead cell color
   */
  clear() {
    this.context.fillStyle = this.deadColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.stroke();
    this.context.fillStyle = this.aliveColor;
  }

  /**
   * Updates the canvas according to the cell array contained in the automaton
   */
  updateUI() {
    this.clear();
    this.context.beginPath();
    let cells = this.automaton.cells;
    for(let x = 0; x < cells.length; x++) {
      for(let y = 0; y < cells[x].length; y++) {
        if(cells[x][y]) {
          this.context.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
    this.context.stroke();
  }

  /**
   * Resets the automaton with a new rule and a new zero to one ratio
   * @param {String} rule - Rule to be applied to the automaton
   * @param {Int} cellSize - Size of one cell in px
   */
  reset(rule, zeroRatio) {
    clearInterval(this.interval);
    this.automaton.reset(rule, zeroRatio);
    this.updateUI();
  }

  /**
   * Runs the cellular automaton by geting the next rule, zeroToOneRatio and number of generations
   * @param {Boolean} skip - Optional parameter, if true, doesn't update the gui every generation
   */
  run(skip=false) {
    // Chooses the next rule to apply
    let elem = this.rules.shift();
    this.rules.push(elem);

    // Resets the current automaton and stops the timeout
    this.reset(elem.rule, elem.zeroRatio);

    if(skip) {
      // Computes the new automaton and only updates the gui at the end
      for(let i = 0; i < elem.gens; i++) {
        this.automaton.update();
      }
      this.updateUI();
    } else {
      // Launches a timeout on the new automaton
      let gens = elem.gens;
      let _this = this;
      this.interval = setInterval(function() {
        gens--;
        if(gens > 0) {
          _this.automaton.update();
          _this.updateUI();
        } else {
          clearInterval(_this.interval);
        }
      }, this.refreshTime);
    }
  }
}


/**
 * Handles the CellularAutomaton itself, i.e. the cells, the rules and transition
 * from one generation to another
 */
class CellularAutomaton {
  zeroToOneRatio;
  birthConditions;
  surviveConditions;
  cells;
  width;
  height;

  /**
   * @constructor
   * @param {Int} width - Number of columns of the grid
   * @param {Int} height - Number of rows of the grid
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({length: this.width}, () =>
      Array.from({length: this.height}, () => this.random())
    );
  }

  /**
   * Returns 0 or 1 following the proportions given by this.zeroToOneRatio
   */
  random() {
    return (Math.random() >= this.zeroToOneRatio ? 1 : 0);
  }

  /**
   * Resets the grid, the rule and the zeroToOneRatio
   */
  reset(rule, zeroRatio) {
    this.zeroToOneRatio = zeroRatio;
    rule = rule.split('/');
    this.birthConditions = rule[0].split("").map(function(item) {
        return parseInt(item);
    });
    this.birthConditions.shift(0,1);
    this.surviveConditions = rule[1].split("").map(function(item) {
        return parseInt(item);
    });
    this.surviveConditions.shift(0,1);

    this.cells = Array.from({length: this.width}, () =>
      Array.from({length: this.height}, () => this.random())
    );
  }

  /**
   * Updates the automaton according to the rule
   */
  update() {
    let newArray = Array.from({length: this.width}, () =>
      Array.from({length: this.height}, () => 0)
    );

    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        // Number of neighboring cells
        let neighbors = this.countNeighbors(x, y, this.cells);
        if(this.cells[x][y]) { // If the cell is alive
          if(!this.surviveConditions.includes(neighbors)) { // It dies if it has not the required number of neighbors
            newArray[x][y] = 0;
          } else {
            newArray[x][y] = 1;
          }
        } else { // If the cell is dead
          if(this.birthConditions.includes(neighbors)) { // It becomes alive if it has the required number of neighbors
            newArray[x][y] = 1;
          } else {
            newArray[x][y] = 0;
          }
        }
      }
    }

    this.cells = newArray;
  }

  /**
   * Returns the number of neighbors at a given row and column of the grid
   * @param {Int} cellX - x coordinate
   * @param {Int} cellY - y coordinate
   * @param {2D array} cells - The grid containing the cells
   */
  countNeighbors(cellX, cellY, cells) {
    let total = 0;
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        let i = cellX + x;
        let j = cellY + y;

        if(i >= 0 && i < this.width && j >= 0 && j < this.height && !(y === 0 && x === 0) && cells[i][j]) {
          total += 1;
        }
      }
    }
    return total;
  }
}
