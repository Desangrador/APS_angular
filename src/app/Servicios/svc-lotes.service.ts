import { Injectable } from '@angular/core';
import { Lote, Producto } from '../Interfaces';
import { ApiAlprosurService } from './API/api-alprosur.service';
import { SvcProductosService } from './svc-productos.service';

@Injectable({
  providedIn: 'root'
})
export class SvcLotesService {
  constructor(
    private svcProductos: SvcProductosService,
    private APIservice: ApiAlprosurService
  ){}

  private Lotes: Lote[] = []
  getLotes(): Lote[]{
    return this.Lotes
  }

  setLotes(lote: Lote[]){
    this.Lotes = lote
  }

  //Borrar un producto (con sus lotes)
  borrarBuscado(pos2:number){
    if (pos2 == -1){
      console.log("El Producto que quiso borrar no se encuentra en la tabla")
    }else{
      this.borrarDeTabla(pos2)
    }
  }

  borrarDeTabla(i: number){
    let Productos2: Producto[] = this.svcProductos.getProductos();
    if (this.svcProductos.getProductos()[i].estaIncluidoEnLotes.length == 0){
      //Borrado de Productos en la API/BD
      this.APIservice.delProductoAPI(Productos2[i].id).subscribe(data => {
        console.log(data)
      })

      //Borrado de Productos en Angular
      Productos2.splice(i,1)
      this.svcProductos.setProductos(Productos2)

      console.log("Producto borrado con éxito")
    }else{
      let i2: number = 0
      while(Productos2[i].estaIncluidoEnLotes.length > 0){
        if (Productos2[i].estaIncluidoEnLotes[0] == this.Lotes[i2]){
          Productos2[i].estaIncluidoEnLotes.splice(0,1);
          this.Lotes.splice(i2,1)
        }else{
          i2++;
        }
      }
      //Borrado de Productos en la API/BD
      this.APIservice.delProductoAPI(Productos2[i].id).subscribe(data => {
        console.log(data)
      })

      //Borrado de Productos en Angular
      Productos2.splice(i,1)
      this.svcProductos.setProductos(Productos2)
      console.log("Producto borrado con éxito")
    }
  }
  //fin de Borrar un producto (con sus lotes)

  nuevoLote(repetir: boolean, i: number, id: number, altLote: Lote, prvacio: Producto, fechaAct: Date): number{
    let Productos2: Producto[] = this.svcProductos.getProductos();

    //veriificar que ningún campo este vacío
    if (altLote.cantidad == 0 || altLote.fechaVenc == new Date("1970-01-02") || prvacio.nombre == "" ){
      console.log("Error al crear el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (altLote.cantidad < 0){
      console.log("La cantidad no puede ser negativa")
    //que la fecha no sea menor a la actual
    }else if (altLote.fechaVenc <= fechaAct){
      console.log(altLote.fechaVenc)
      console.log("La fecha de vencimiento no es válida")
    }else{
      //Buscar el producto por codigo
      while (repetir){
        if (i == Productos2.length){
          console.log("Error, no se pudo agregar el Lote por que el producto no existe, o no hay productos")
          repetir = false
        }else{
          if (Productos2[i].nombre == prvacio.nombre){
            altLote.productoId = Productos2[i].id

            id++
            altLote.id = id

            //Agregar lote en Angular
            this.Lotes.push(altLote)
            //agregar el Lote a Producto
            Productos2[i].estaIncluidoEnLotes.push(altLote)

            //Agregar lote en la API/BD
            let APIlote = {
              cantidad: altLote.cantidad,
              fechaVenc: altLote.fechaVenc,
              productoId: altLote.productoId
            }
            this.APIservice.setNuevoLote(APIlote).subscribe(data => {
              console.log(data)
            })
            console.log("Lote añadido con éxito")

            repetir = false
          }else{
            i++
          }
        }
      }
      this.svcProductos.setProductos(Productos2)
    }
    return id;
  }

  borrarLoteDeTabla(l: number, repetir: boolean, i: number){
    while (repetir){
      if (i == this.svcProductos.getProductos()[this.Lotes[l].productoId].estaIncluidoEnLotes.length){
        repetir = false
        console.log ("Error Inesperado, no se encontró el lote a borrar")
      }else if (this.svcProductos.getProductos()[this.Lotes[l].productoId].estaIncluidoEnLotes[i].id == this.Lotes[l].id){
        this.svcProductos.getProductos()[this.Lotes[l].productoId].estaIncluidoEnLotes.splice(i,1)
        repetir = false;
      }else{
        i++
      }
    }
    //Borrar lote de Angular
    this.Lotes.splice(l,1)
    //Borrar lote de la API/BD
    let APIlote = this.Lotes[l]
    // this.APIservice
  }

  seleccionarLote(l: number, altLote: Lote): Lote{
    let seleccion: Lote = this.Lotes[l]

    altLote.id = seleccion.id
    altLote.cantidad = seleccion.cantidad
    altLote.fechaVenc = seleccion.fechaVenc
    altLote.productoId = seleccion.productoId

    return altLote
  }

  seleccionarProductodeLote(l: number, prvacio: Producto): string{
    let seleccion: Lote = this.Lotes[l]
    console.log(this.svcProductos.getProductos().length)
    for (let i = 0; i < this.svcProductos.getProductos().length;i++){
      if (seleccion.productoId == this.svcProductos.getProductos()[i].id){

        console.log(seleccion.productoId)
        console.log(this.svcProductos.getProductos()[i].id)

        prvacio.nombre = this.svcProductos.getProductos()[i].nombre
      }
    }
    console.log(prvacio.nombre)
    return prvacio.nombre
  }

  actualizarLote(repetir: boolean, pos: number, i: number, altLote: Lote, prvacio: Producto, fechaAct: Date){
    if (pos == -1){
      console.log("imposible modificar, el Lote no existe")
    }else if (altLote.cantidad == 0 || altLote.fechaVenc == new Date("1970-01-02") || prvacio.nombre == "" ){
      console.log("Error al modificar el lote, uno o más campos están vacíos")
    //que la cantidad no sea negativa
    }else if (altLote.cantidad == this.Lotes[pos].cantidad && altLote.fechaVenc == this.Lotes[pos].fechaVenc && prvacio.nombre == this.svcProductos.getProductos()[this.Lotes[pos].productoId].nombre){
      console.log("No ha realizado modificación alguna")
    }else if (altLote.cantidad < 0){
      console.log("La cantidad no puede ser negativa")
    //que la fecha no sea menor a la actual
    }else if (altLote.fechaVenc <= fechaAct){
      console.log("La fecha de vencimiento no es válida")
    }else{
      //buscar si los productos son iguales
      //si son iguales entonces modificar
      if (this.svcProductos.getProductos()[altLote.productoId].nombre == prvacio.nombre){
        //Actualizar Lote en angular
        this.Lotes[pos].cantidad = altLote.cantidad
        this.Lotes[pos].fechaVenc = altLote.fechaVenc

        //Actualizar Lote en la API/BD
        let APIlote ={
          cantidad: altLote.cantidad,
          fechaVenc: altLote.fechaVenc,
          productoId: altLote.productoId
        }
        this.APIservice.actLoteAPI(APIlote,altLote.id).subscribe(data => {
          console.log(data)
        })
        console.log("El Lote ha sido modificado")
      }else{
      //si no son iguales se deberá de eliminar el Lote del producto en el que estaba antes y ponerlo en el nuevo producto
      console.log("no son iguales")
        while (repetir){
          if (i == this.svcProductos.getProductos().length){
            console.log("Error, no se pudo modificar el Lote por que el producto no existe")
            repetir = false
          }else{
            //Si encuentra el nuevo producto buscaremos el lote en el viejo producto y lo eliminaremos
            if (this.svcProductos.getProductos()[i].nombre == prvacio.nombre){
              let repetir2: boolean = true
              let i2: number = 0

              //Buscar el lote en el viejo producto para quitarlo
              while (repetir2){
                if (i2 == this.svcProductos.getProductos()[altLote.productoId].estaIncluidoEnLotes.length){
                  repetir2 = false
                }else if (this.svcProductos.getProductos()[altLote.productoId].estaIncluidoEnLotes[i2].id == altLote.id){
                  this.svcProductos.getProductos()[altLote.productoId].estaIncluidoEnLotes.splice(i2,1)
                  repetir2 = false;
                }else{
                  i2++
                }
              }

              //Actualizar datos
              this.svcProductos.getProductos()[altLote.productoId] = this.svcProductos.getProductos()[i]
              this.Lotes[pos].cantidad = altLote.cantidad
              this.Lotes[pos].fechaVenc = altLote.fechaVenc
              this.Lotes[pos].productoId = altLote.productoId
              this.svcProductos.getProductos()[i].estaIncluidoEnLotes.push(altLote)

              console.log("El Lote ha sido modificado")
              repetir = false
            }else{
              i++
            }
          }
        }
      }
    }
  }
}
