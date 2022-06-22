import { Component, OnInit } from '@angular/core';
import { Lote, Producto} from 'src/app/Interfaces';
import { ApiAlprosurService } from 'src/app/Servicios/API/api-alprosur.service';
import { SvcLotesService } from 'src/app/Servicios/svc-lotes.service';
import { SvcProductosService } from 'src/app/Servicios/svc-productos.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: [ '../../app.component.css' ]
})
export class LotesComponent implements OnInit {
  constructor(
    private svcLotes: SvcLotesService,
    private svcProductos: SvcProductosService,
    private APIservice: ApiAlprosurService
  ){}

  ngOnInit(): void {
    this.APIservice.getLotesAPI().
    subscribe(data => {
      this.svcLotes.setLotes(data)
    })
    this.APIservice.getProductosAPI().
    subscribe(data => {
      this.svcProductos.setProductos(data)
    })
  }
  ListaProductos(): Producto[]{
    return this.svcProductos.getProductos()
  }

  //Producto vacio
  prvacio: Producto = {
    id: 0,
    codigo: "",
    nombre: "",
    detalles: "",
    precio: 0,
    estaIncluidoEnLotes: []
  }

  //fechas temporales
  fechaAct: Date = new Date()

  //Variables auxiliares
  repetir: boolean = true
  i: number = 0
  id: number = 0
  pos: number = -1
  //Fin variables auxiliares
  listarLotes(): Lote[]{
    return this.svcLotes.getLotes()
  }

  altLote: Lote = {
    id: 0,
    cantidad: 0,
    fechaVenc: new Date("1970-01-02"),
    estaIncluidoEnDetallesDeAtencion: [],
    productoId: this.prvacio.id
  }

  //Instancias vacías
  reset(){
    //Lote
    this.altLote = {
      id: 0,
      cantidad: 0,
      fechaVenc: new Date("1970-01-02"),
      estaIncluidoEnDetallesDeAtencion: [],
      productoId: this.prvacio.id
    }
    //Producto
    this.prvacio = {
      id: 0,
      codigo: "",
      nombre: "",
      detalles: "",
      precio: 0,
      estaIncluidoEnLotes: []
    }
    //variables auxiliares

    this.repetir = true
    this.i = 0
    this.pos = -1

  }
  onRegistrar(){
    this.id = this.svcLotes.nuevoLote(this.repetir,this.i,this.id,this.altLote, this.prvacio, this.fechaAct)
    this.reset()
  }

  onBorrarTabla(l: number){
    this.svcLotes.borrarLoteDeTabla(l,this.repetir,this.i)
    this.reset()
  }

  onModificarTabla(l:number){
    this.altLote = this.svcLotes.seleccionarLote(l,this.altLote)
    this.prvacio.nombre = this.svcLotes.seleccionarProductodeLote(l,this.prvacio)
    this.pos = l
  }
  onActualizar(){
    this.svcLotes.actualizarLote(this.repetir, this.pos, this.i, this.altLote, this.prvacio, this.fechaAct)
    this.reset()
  }
}
