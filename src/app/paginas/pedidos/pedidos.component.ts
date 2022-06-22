import { Component, OnInit } from '@angular/core';
import { Cliente, Pedido2, Producto } from 'src/app/Interfaces';
import { SvcClientesService } from 'src/app/Servicios/svc-clientes.service';
import { SvcProductosService } from 'src/app/Servicios/svc-productos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class PedidosComponent implements OnInit {
  constructor(
    private svcProductos: SvcProductosService,
    private svcClientes: SvcClientesService
  ) { }
  ngOnInit(): void {
  }
ListaProductos(): Producto[]{
  return this.svcProductos.getProductos()
}


ListaCliente(): Cliente[]{
  return this.svcClientes.getClientes()
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
    this.position = -1;
  }
}
