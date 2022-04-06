import { Component } from '@angular/core';
import { Producto, Productos, Lote, Lotes } from './Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Almacén';

  // Atributos Temporales
  adminusuario: string = "admin"
  admincontraseña: string = "1234"
  i: number = 0
  repetir: boolean = true

  // Atributos de un Producto Nuevo
  acodigo: string = ""
  anombre: string = ""
  adetalles: string = ""
  aprecio: number = 0

  ListaProductos(): Producto[]{
    return Productos;
  }


  onCrearPRoducto(){

    this.repetir = true;
    this.i = 0;

    if (this.acodigo == "" || this.anombre == "" || this.adetalles == "" || this.aprecio <= 0){
      console.log("No se puede crear el producto, uno o más campos no contienen datos")
    }else{
      if (Productos.length == 0){
        //Si no hay productos se crea uno nuevo
        let prdt: Producto = {
          id: Productos.length + 1,
          codigo: this.acodigo,
          nombre: this.anombre,
          detalles: this.adetalles,
          precio: this.aprecio,
          estaIncluidoEnLotes: []
        }
        Productos.push(prdt)
        console.log("Producto creado con éxito")

      }else{
        //Si ya hay productos entonces buscamos si el producto ya existe
        while (this.repetir){
          //Si el nombre o el codigo son iguales ya no se crea el producto
          if (this.i < Productos.length){
            if (Productos[this.i].nombre == this.anombre || Productos[this.i].codigo == this.acodigo){
              console.log("Error, no se puede crear 2 productos con nombres y/o codigos iguales")
              this.repetir = false
            }
          }else if (this.i == Productos.length){

            let prdt: Producto = {
              id: Productos.length + 1,
              codigo: this.acodigo,
              nombre: this.anombre,
              detalles: this.adetalles,
              precio: this.aprecio,
              estaIncluidoEnLotes: []
            }
            Productos.push(prdt)
            console.log("Producto creado con éxito")

            this.repetir = false;

          }
          this.i++;
        }
      }
    }
    console.table(Productos)
  }
  //  Atributos de busqueda
  bid:number = 0
  prI: number = 0;
  bnombre: string = ""

  // Atributos de Modificacion
  mid: number = 0
  mcodigo: string = ""
  mnombre: string = ""
  mdetalles: string = ""
  mprecio: number = 0

  onBuscar(){

    this.i = 0
    this.repetir = true

    this.prI = 0
    this.mid = 0
    this.mcodigo  = ""
    this.bnombre = ""
    this.mnombre = ""
    this.mdetalles  = ""
    this.mprecio  = 0

    if (this.bid <= 0){
      console.log("Error, ID no válida")
    }else{
      while (this.repetir){
        if (this.i == Productos.length){
          console.log("Error, ID de Producto no encontrada")
          this.repetir = false
        }else if(Productos[this.i].id == this.bid){
          console.log(Productos[this.i].id+" - "+this.bid)
          console.log("Producto enoontrado")
          this.prI = this.i
          this.mid = Productos[this.i].id
          this.mcodigo = Productos[this.i].codigo
          this.bnombre = Productos[this.i].nombre
          this.mnombre = Productos[this.i].nombre
          this.mdetalles = Productos[this.i].detalles
          this.mprecio = Productos[this.i].precio
          this.repetir = false
        }
        this.i++
      }
    }
  }

  onBorrar(){
    this.i = 0
    this.repetir = true

    if (this.bid <= 0){
    console.log("Error, ID no válida")
    }else{
      while (this.repetir){
        if (this.i == Productos.length){
          console.log("Error, ID de Producto no encontrada")
          this.repetir = false
        }else if(Productos[this.i].id == this.bid){
          Productos.splice(this.i,1)
          console.log("Producto borrado con éxito")
          console.table(Productos)
          this.repetir = false
        }
        this.i++
      }
    }
    this.bid = 0
    this.bnombre = ""
    
    this.mid = 0
    this.mcodigo  = ""
    this.mnombre = ""
    this.mdetalles  = ""
    this.mprecio  = 0
  }

  onModificar(){

    this.repetir = true;
    this.i = 0;

    if (this.mcodigo == "" || this.mnombre == "" || this.mdetalles == "" || this.mprecio <= 0){
      console.log("No se puede modificar el producto, uno o más campos no contienen datos")
    }else if(this.mnombre == Productos[this.prI].nombre && this.mdetalles == Productos[this.prI].detalles && this.mprecio == Productos[this.prI].precio){
      console.log("No ha realizado algún cambio notable sobre el producto, Operación cancelada")
    }else{
      while (this.repetir){
        if (this.i == Productos.length){
          Productos[this.prI].nombre = this.mnombre
          Productos[this.prI].detalles = this.mdetalles
          Productos[this.prI].precio = this.mprecio
          this.repetir = false
          console.log("Datos actualizados")
        }else if (Productos[this.i].nombre == this.mnombre){
          if (this.prI != this.i ){
            console.log("Error, no se puede modificar el Producto por que el nombre y/o código ya existen")
            this.repetir = false
          }
        }
        this.i++
      }
    }

    console.table(Productos)
  }
}