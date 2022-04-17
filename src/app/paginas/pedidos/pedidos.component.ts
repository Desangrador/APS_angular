import { Component, OnInit } from '@angular/core';
import { Pedido2 } from 'src/app/Interfaces';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class PedidosComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

public pedido: Pedido2 = this.pedidoEmpty();
  public pedidos: Pedido2[] = [];
  public position: number = -1;

  onDatos(): void {
    if (this.position == -1) {
      console.log(this.pedido);
      this.pedidos.push(this.pedido);
      this.pedido = this.pedidoEmpty();
    } else {
      let selection: Pedido2 = this.pedidos[this.position];
      selection.supermercado = this.pedido.supermercado;
      selection.producto = this.pedido.producto;
      selection.cantidad = this.pedido.cantidad;
      selection.fecha = this.pedido.fecha;
      this.pedido = this.pedidoEmpty();
      this.position = -1;
    }
  }

  pedidoEmpty(): Pedido2 {
    return {
      supermercado: "",
      producto: "",
      cantidad: 0,
      fecha: ""
    };
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Pedido2 = this.pedidos[i];
    this.pedido.supermercado = selection.supermercado;
    this.pedido.producto = selection.producto;
    this.pedido.cantidad = selection.cantidad;
    this.position = i;
  }
  
  onDelete(i: number): void {
    this.pedidos.splice(i, 1);
  }
}
