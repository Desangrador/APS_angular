import { Injectable } from '@angular/core';
import { Cliente } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SvcClientesService {
  constructor(){}

  private Clientes: Cliente[] = []
  getClientes(): Cliente[]{
    return this.Clientes
  }

  nuevoCliente(position: number, cliente: Cliente){
    if (position == -1) {
      console.log(cliente);
      this.Clientes.push(cliente);
    } else {
      let selection: Cliente = this.Clientes[position];
      
      selection.id = cliente.id
      selection.ruc = cliente.ruc
      selection.dni = cliente.dni
      selection.nombre = cliente.nombre
      selection.aPaterno = cliente.aPaterno
      selection.aMaterno = cliente.aMaterno
      selection.telefono = cliente.telefono
      selection.correo = cliente.correo
    }
  }

  editarCliente(cliente: Cliente, i: number): Cliente{
    let selection: Cliente = this.Clientes[i];
    
    cliente.id = selection.id
    cliente.ruc = selection.ruc
    cliente.dni = selection.dni
    cliente.nombre = selection.nombre
    cliente.aPaterno = selection.aPaterno
    cliente.aMaterno = selection.aMaterno
    cliente.telefono = selection.telefono
    cliente.correo = selection.correo
    return cliente
  }

  borrarCliente(i: number){
    this.Clientes.splice(i, 1);
  }
}
