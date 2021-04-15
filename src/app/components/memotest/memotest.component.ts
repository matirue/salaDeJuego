import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CardData } from 'src/app/class/cartas';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  @Input() data: CardData | undefined;

  @Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
