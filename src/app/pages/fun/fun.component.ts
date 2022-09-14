import {Component, OnInit} from '@angular/core';

const ROWS = 35;
const COLS = 60;
const BOX_L = '25px';
const START_CLASS = 'start';
const DESTINATION_CLASS = 'destination';
const BOMB_CLASS = 'bomb';
const BURST_CLASS = 'burst';
const SELECTED_CLASS = 'selected';
const BLANK_CLASS = 'blank';
const START = null;
const DESTINATION = null;
const VISITED_CLASS = 'visited';
const MAX_BOMBS = 10;

const DX = [-1, +0, +1, +0, -1, -1, +1, +1];
const DY = [+0, -1, +0, +1, +1, -1, +1, -1];

class Cell {
  constructor(
    public isSelected: boolean,
    public weight: number,
    public value: number,
    public visited: boolean,
    public visited2: boolean,
    public row: number,
    public col: number,
    public bomb: boolean,
    public burst: boolean,
    public willBurst: boolean) {
  }
}

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.css']
})
export class FunComponent implements OnInit {
  boxL = BOX_L;

  adjMat: Cell[][] = [];
  start: number[] | null = START;
  destination: number[] | null = DESTINATION;

  lastSelected: number[] = START ?? [0, 0];

  mazeLevel: number = 0.4;

  forceStop = false;

  maxBombs = MAX_BOMBS;

  score = '';

  // [ngClass]="cell % 2 == 0 && row % 2 == 1 || cell % 2 == 1 && row % 2 == 0 ? 'tw-bg-black' : 'white'"

  constructor() {
  }

  ngOnInit(): void {
    let c = 0;
    for (let i = 0; i < ROWS; i++) {
      this.adjMat.push([]);
      for (let j = 0; j < COLS; j++) {
        this.adjMat[i].push(new Cell(false, c, 1, false, false, i, j, false, false, false));
        c++;
      }
    }

    this.createMaze();
  }

  createMaze(): void {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const cell = this.adjMat[i][j];
        if (!cell.isSelected)
          this.adjMat[i][j].isSelected = Math.random() < this.mazeLevel;
      }
    }
    // this.mazeLevel += 0.1;
  }

  reset(): void {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const cell = this.adjMat[i][j];
        cell.isSelected = false;
        cell.visited = false;
        cell.visited2 = false;
        cell.bomb = false;
        cell.burst = false;
        cell.willBurst = false;
        this.maxBombs = MAX_BOMBS;
      }
    }
    this.mazeLevel = 0.4;
  }

  reload(): void {
    this.forceStop = true;
    this.reset();
    this.createMaze();
  }

  run(): void {
    let c: number = 0;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        setTimeout(() => {
          const cell = this.adjMat[i][j];
          cell.visited = !cell.visited;
        }, 0);
        c++;
      }
    }
  }

  bfs(isPop: boolean = true): void {
    this.forceStop = false;
    if (this.start == null) return;

    const si = this.start[0];
    const sj = this.start[1];
    const cell = this.adjMat[si][sj];

    const q = [cell];
    let step = 0;
    while (q.length > 0 && !this.forceStop) {
      step++;
      const v = isPop ? q.pop()! : q.shift()!;
      v.visited = true;

      // for (let b = 0; b < this.bombs.length; b++) {
      //   if (v.row === this.bombs[b][0] && v.col === this.bombs[b][1]) {
      //     this.bombs = [...this.bombs.filter(o => o[0] !== v.row && o[1] !== v.col)]
      //   }
      // }

      if (v.bomb) {
        v.willBurst = true;
        for (let i = 0; i < 8; i++) {
          let x = v.row;
          let y = v.col;

          x += DX[i];
          y += DY[i];

          if (x < ROWS && y < COLS && x >= 0 && y >= 0) {
            const cCell = this.adjMat[x][y];
            cCell.willBurst = true;
          }
        }
      }

      setTimeout(() => {
        if (!this.forceStop)
          v.visited2 = true;
        if (v.bomb) {
          v.burst = true;
          for (let i = 0; i < 8; i++) {
            let x = v.row;
            let y = v.col;

            x += DX[i];
            y += DY[i];

            if (x < ROWS && y < COLS && x >= 0 && y >= 0) {
              const cCell = this.adjMat[x][y];
              cCell.burst = true;
              cCell.isSelected = false;
            }
          }
        }
      }, step * 20);

      for (let i = 0; i < 4; i++) {
        let x = v.row;
        let y = v.col;

        x += DX[i];
        y += DY[i];

        if (x < ROWS && y < COLS && x >= 0 && y >= 0) {
          const cCell = this.adjMat[x][y];
          if (
            !cCell.visited &&
            (!cCell.isSelected || cCell.willBurst) &&
            cCell.value === 1 &&
            !(cCell.row === cell.row && cCell.col === cell.col)
          ) {
            q.push(cCell);
          }
        }
      }
    }

    console.log(step);
    this.calculateScore();

  }

  // ngAfterViewInit(): void {
  //   onkeyup = ($event) => {
  //     let charCode = $event.key.toLowerCase();
  //     $event.preventDefault();
  //     if ($event.ctrlKey && charCode === 's') this.selectStart(this.lastSelected[0], this.lastSelected[1]);
  //     // if ($event.ctrlKey && charCode === 'd') this.selectDestination();
  //     // if ($event.ctrlKey && charCode === 't') this.togglePoints();
  //   };
  // }

  toggleSelected(i: number, j: number): void {
    // if (this.start == null || this.destination == null) return;
    //
    // const si = this.start[0];
    // const sj = this.start[1];
    // const di = this.destination[0];
    // const dj = this.destination[1];
    //
    // if (i === si && j === sj || i === di && j === dj) return;

    const cell = this.adjMat[i][j];
    cell.isSelected = !cell.isSelected;
    cell.value = cell.isSelected ? 0 : 1;
    this.lastSelected = [i, j];
  }

  select(i: number, j: number): void {
    // const i = this.lastSelected[0];
    // const j = this.lastSelected[1];
    const cell = this.adjMat[i][j];

    if (cell.isSelected) return;

    if (cell.bomb) {
      this.maxBombs++;
      cell.bomb = false;
      return;
    }
    if (this.maxBombs > 0) {
      cell.bomb = true;
      this.maxBombs--;
      return;
    }
    // cell.isSelected = false;
    this.start = [i, j];
  }

  selectDestination(): void {
    const i = this.lastSelected[0];
    const j = this.lastSelected[1];
    const cell = this.adjMat[i][j];
    cell.isSelected = false;
    this.destination = [i, j];
  }

  togglePoints(): void {
    if (this.start == null || this.destination == null) return;

    const temp = [...this.start];
    this.start = [...this.destination];
    this.destination = temp;
  }

  getBgClass(i: number, j: number): string {

    const cell = this.adjMat[i][j];

    // for (let b = 0; b < this.bombs.length; b++) {
    //   if (i === this.bombs[b][0] && j === this.bombs[b][1]) return BOMB_CLASS;
    // }

    if (cell.burst) return BURST_CLASS;
    if (cell.bomb) return BOMB_CLASS;
    if (cell.visited2) return VISITED_CLASS;

    if (this.start == null) return '';
    if (i === this.start[0] && j === this.start[1]) return START_CLASS;
    // if (i === this.destination[0] && j === this.destination[1]) return DESTINATION_CLASS;
    if (cell.isSelected) return SELECTED_CLASS;
    return BLANK_CLASS;
  }

  calculateScore(): void {
    let totalUnselected = 0;
    let visited = 0;
    for (let row of this.adjMat) {
      for (let cell of row) {
        if (!cell.isSelected) totalUnselected++;
        if (cell.visited) visited++;
      }
    }
    this.score = (visited / totalUnselected * 100).toFixed(0);
  }

}
