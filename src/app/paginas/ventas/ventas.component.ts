import { Component, OnInit } from '@angular/core';
import { Factura, Facturas } from 'src/app/Interfaces';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class VentasComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
  ListarFactura(): Factura[]{
    return Facturas
  }
  
}
