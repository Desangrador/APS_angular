import { Component } from '@angular/core';
import { Producto, Productos, Lote, Lotes } from './Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Almacén';
  adminusuario: string = "admin"
  admincontraseña: string = "1234"
  i: number = 0
  repetir: boolean = true

  acodigo: string = ""
  anombre: string = ""
  adetalles: string = ""
  aprecio: number = 0


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

    
    this.mcodigo  = ""
    this.mnombre = ""
    this.mdetalles  = ""
    this.mprecio  = 0

    if (this.bid <= 0){
      console.log("Error, ID no válida")
      this.mid = 0
    }else{
      if (this.bid > Productos.length){
        console.log("Error, ID de Producto no encontrada")
      }else{
        console.log("Producto enoontrado")
        this.prI = Productos.length-1
        this.mid = Productos[this.prI].id
        this.mcodigo = Productos[this.prI].codigo
        this.mnombre = Productos[this.prI].nombre
        this.mdetalles = Productos[this.prI].detalles
        this.mprecio = Productos[this.prI].precio
      }
    }
  }

  onModificar(){
    if (this.acodigo == "" || this.anombre == "" || this.adetalles == "" || this.aprecio <= 0){
      console.log("No se puede modificar el producto, uno o más campos no contienen datos")
    }else if(this.mnombre == Productos[this.prI].nombre && this.mdetalles == Productos[this.prI].detalles && this.mprecio == Productos[this.prI].precio){
      console.log("NO ha realizado algún cambio notable sobre el producto, Operación cancelada")
    }else{
      Productos[this.prI].nombre = this.mnombre
      Productos[this.prI].detalles = this.mdetalles
      Productos[this.prI].precio = this.mprecio
      console.log("Datos actualizados")
    }
  }
}