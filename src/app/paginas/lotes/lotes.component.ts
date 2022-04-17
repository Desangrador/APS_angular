import { Component, OnInit } from '@angular/core';
import { Lote, Lotes } from 'src/app/Interfaces';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class LotesComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  listarLotes(): Lote[]{
    return Lotes
  }

  
}
