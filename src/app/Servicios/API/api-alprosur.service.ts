import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote, Producto } from 'src/app/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiAlprosurService {

  constructor(
    private http: HttpClient
  ) { }

  //Productos
  //GET x
  getProductosAPI(){
    return this.http.get<Producto[]>('http://localhost:3500/API/v1/productos/lista')
  }
  //POST X
  setNuevoProductoAPI(nuevo: any){
    return this.http.post('http://localhost:3500/API/v1/productos/', nuevo)
  }
  //PATCH x
  actProductoAPI(actualizar: any,id: number){
    return this.http.put('http://localhost:3500/API/v1/productos/'+id, actualizar)
  }
  //DELETE x
  delProductoAPI(id: number){
    return this.http.delete('http://localhost:3500/API/v1/productos/'+id)
  }

  //Lotes
  //GET x
  getLotesAPI(){
    return this.http.get<Lote[]>('http://localhost:3500/API/v1/lotes/lista')
  }
  //POST x
  setNuevoLote(nuevo: any){
    return this.http.post('http://localhost:3500/API/v1/lotes',nuevo)
  }
  //PATCH
  actLoteAPI(actualizar:any, id: number){
    return this.http.put('http://localhost:3500/API/v1/lotes'+id, actualizar)
  }
  //DELETE
}
