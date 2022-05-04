import { Component, OnInit } from '@angular/core';
import { Cliente, Clientes } from 'src/app/Interfaces';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class ClienteComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  public cliente: Cliente = this.ClienteEmpty();
  public position: number = -1;

  ListaCliente(): Cliente[]{
    return Clientes;
  }

  
  onDatos(): void {
    if (this.position == -1) {
      console.log(this.cliente);
      Clientes.push(this.cliente);
      this.cliente = this.ClienteEmpty();
    } else {
      let selection: Cliente = Clientes[this.position];
      
      selection.id = this.cliente.id
      selection.ruc = this.cliente.ruc
      selection.dni = this.cliente.dni
      selection.nombre = this.cliente.nombre
      selection.aPaterno = this.cliente.aPaterno
      selection.aMaterno = this.cliente.aMaterno
      selection.telefono = this.cliente.telefono
      selection.correo = this.cliente.correo

      this.cliente = this.ClienteEmpty();
      this.position = -1;
    }
  }

  ClienteEmpty(): Cliente {
    return{
    id: 0,
    ruc: "",
    dni: "",
    nombre: "",
    aPaterno: "",
    aMaterno: "",
    telefono: "",
    correo: "",
    tienePedidos: [],
    tieneFacturas: []
    }
  }

  onEdit(i: number): void {
    //this.pedido = this.pedidos[i];
    let selection: Cliente = Clientes[i];
    
    this.cliente.id = selection.id
    this.cliente.ruc = selection.ruc
    this.cliente.dni = selection.dni
    this.cliente.nombre = selection.nombre
    this.cliente.aPaterno = selection.aPaterno
    this.cliente.aMaterno = selection.aMaterno
    this.cliente.telefono = selection.telefono
    this.cliente.correo = selection.correo

    this.position = i;
  }

  onDelete(i: number): void{
    Clientes.splice(i, 1);
    this.position = -1
  }

}
