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

  getProductosAPI(){
    return this.http.get<Producto[]>('http://localhost:3500/API/v1/productos/lista')
  }
  getLotesAPI(){
    return this.http.get<Lote[]>('http://localhost:3500/API/v1/lotes/lista')
  }
}
