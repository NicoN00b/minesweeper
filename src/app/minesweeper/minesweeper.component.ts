import { Component, Input, OnInit } from '@angular/core';
import { partition } from '../util';
import { revealTile, isGameOver} from '../game';

const { Map, List } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50


@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  @Input() game: any;
  rows;
  history = Immutable.List();

  onChanges(changes){
    if(changes.hasOwnProperty('game')){
      this.updateGame()
    }
  }

  updateGame(updateHistory = true){
    this.rows = partition(this.game.get('cols'), this.game.get('tiles'));
    if(updateHistory){
      this.history = this.history.push(this.game);
    }
  }

  handleTileClick(tile){
    if(!tile){
      return;
    }
    if (isGameOver(this.game)){
      return;
    }
    const newGame = revealTile(this.game, tile.get('id'));
    if (newGame !== this.game) {
      this.game = newGame;
      this.updateGame();
    }
    if (isGameOver(this.game)) {
      window.alert('GAME OVER!');
    }
  }

  undo(){
    if(this.canUndo()) {
      this.history = this.history.pop();
      this.game = this.history.last();

      this.updateGame(false);
    }
  }

  canUndo(){
    return this.history.size > 1;
  }

  ngOnInit() {
  }

}
