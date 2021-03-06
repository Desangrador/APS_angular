import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Interfaces';
import { ApiAlprosurService } from 'src/app/Servicios/API/api-alprosur.service';
import { SvcLotesService } from 'src/app/Servicios/svc-lotes.service';
import { SvcProductosService } from 'src/app/Servicios/svc-productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class ProductosComponent implements OnInit {
  constructor(
    private svcProductos: SvcProductosService,
    private svcLotes: SvcLotesService,
    private APIservice: ApiAlprosurService
  ){}

  ngOnInit(): void {
    this.APIservice.getProductosAPI().
    subscribe(data => {
      //añadir estaIncluidoEnLotes
      for (let i = 0; i < data.length; i++){
        data[i].estaIncluidoEnLotes = []
      }
      this.svcProductos.setProductos(data)
      //añadir todos los Lotes a cada producto
      let lotesSueltos = this.svcLotes.getLotes()
      for (let i = 0; i < data.length; i++){
        for (let e = 0; e < lotesSueltos.length; e++){
          if (lotesSueltos[e].productoId == data[i].id){
            data[i].estaIncluidoEnLotes.push(lotesSueltos[e])
          }
        }
      }
      this.svcProductos.setProductos(data)
    })
    this.APIservice.getLotesAPI().
    subscribe(data => {
      this.svcLotes.setLotes(data)
    })
  }

  ListaProductos(): Producto[]{
    console.log(this.svcProductos.getProductos())
    return this.svcProductos.getProductos()
  }

  altProducto: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }
  bscProducto: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }

  ProductoVacio(): Producto{
    return {
      id: 0,
      codigo: "",
      nombre: "",
      detalles: "",
      precio: 0,
      estaIncluidoEnLotes: []
    }
  }

  // Variables auxiliares
  titulo: string = "Agregar un nuevo Producto"
  i: number = 0
  repetir: boolean = true
  pos: number = -1
  pos2: number = -1
  id: number = 0
  // Fin variables auxiliares

  //resetear variables
  reset(){
    this.pos = -1
    this.pos2 = -1
    this.altProducto = this.ProductoVacio()
    this.bscProducto = this.ProductoVacio()
  }

  // Crear un Producto nuevo
  onCrearProducto2(){
    this.id = this.svcProductos.nuevoProducto(this.repetir, this.i, this.altProducto, this.id)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onModificarProductoTabla(a: number){
    this.titulo = "Modificar un Producto"
    this.altProducto = this.svcProductos.seleccionarProductoTabla(a,this.altProducto)
    this.pos = a
  }

  ModificarProducto(){
    this.svcProductos.modificarProducto(this.pos, this.altProducto, this.repetir, this.i)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onBuscar2(){
    this.pos2 = this.svcProductos.buscarProducto(this.repetir, this.i, this.pos2, this.bscProducto)
  }

  onBorrar2(){
    this.svcLotes.borrarBuscado(this.pos2)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onBorrarTabla(i: number){
    this.svcLotes.borrarDeTabla(i)
    this.reset()
    this.titulo = "Agregar un nuevo Producto"
  }

  onModificar2(){
    this.titulo = "Modificar un Producto"
    this.pos = this.pos2
    if (this.pos2 == -1){
      console.log ("Error, no hay el producto para modificar")
      this.reset()
    }else{
      this.altProducto = this.svcProductos.seleccionarProductoTabla(this.pos,this.altProducto)
      this.bscProducto = this.ProductoVacio()
    }
  }
}
