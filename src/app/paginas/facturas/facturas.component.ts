import { Component, OnInit } from '@angular/core';
import { Factura2 } from 'src/app/Interfaces';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class FacturasComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

public factura: Factura2 = this.facturaEmpty(); 
  public facturas: Factura2 []= [];
  public position: number = -1; 

  
  onDatos(): void {
    if (this.position == -1) {
      console.log(this.factura);
      this.facturas.push(this.factura);
      this.factura = this.facturaEmpty();
    } else {
      let selection: Factura2 = this.facturas[this.position];
      selection.codigo = this.factura.codigo;
      selection.DNI = this.factura.DNI;
      selection.supermercado = this.factura.supermercado;
      selection.formaPay = this.factura.formaPay;
      selection.fecha = this.factura.fecha;
      selection.descripcion = this.factura.descripcion;
      selection.importe = this.factura.importe;
      this.factura = this.facturaEmpty();
      this.position = -1;
    }
  }

  facturaEmpty(): Factura2 {
    return{
    codigo: "",
    DNI: "",
    supermercado: "",
    formaPay: "",
    fecha: "",
    descripcion: "",
    importe:"$ ",

    };
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Factura2 = this.facturas[i];
    this.factura.codigo = selection.codigo;
    this.factura.DNI = selection.DNI;
    this.factura.supermercado = selection.supermercado;
    this.factura.formaPay = selection.formaPay;
    this.factura.fecha = selection.fecha;
    this.factura.descripcion = selection.descripcion;
    this.factura.importe = selection.importe;
    this.position = i;
  }

  onDelete(i: number): void{
    this.facturas.splice(i, 1);
    this.position = -1
  }
}
