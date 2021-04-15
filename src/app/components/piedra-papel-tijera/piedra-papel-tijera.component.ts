import { Component, OnInit } from '@angular/core';
import { GameService } from './../../service/game.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  result: string = '';
  pointsUser = 0;
  pointsComp =  0;

  constructor(private playGame: GameService) { }

  ngOnInit(): void {
    this.result = 'Esperando jugada...';
    console.log(this.pointsUser);
  }

  play(choice:string):void{
    const result = this.playGame.game(choice);
    this.result = result.message;
    this.pointsUser += result.userAdd;
    this.pointsComp += result.compAdd;
  }

}
