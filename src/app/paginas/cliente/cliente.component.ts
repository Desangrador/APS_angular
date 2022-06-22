import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Interfaces';
import { SvcClientesService } from 'src/app/Servicios/svc-clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class ClienteComponent implements OnInit {
  constructor(
    private svcClientes: SvcClientesService
  ){}
  ngOnInit(): void {
  }

  ListaCliente(): Cliente[]{
    return this.svcClientes.getClientes()
  }

  public cliente: Cliente = this.ClienteEmpty();
  public position: number = -1;

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

  onDatos(): void {
    this.svcClientes.nuevoCliente(this.position,this.cliente)
    this.position = -1;
    this.cliente = this.ClienteEmpty();
  }

  

  onEdit(i: number): void {
    this.cliente = this.svcClientes.editarCliente(this.cliente,i)
    this.position = i;
  }

  onDelete(i: number): void{
    this.svcClientes.borrarCliente(i)
    this.position = -1
  }

}
