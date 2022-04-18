import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { HomeComponent } from './paginas/home/home.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { FacturasComponent } from './paginas/facturas/facturas.component';
import { VentasComponent } from './paginas/ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    LotesComponent,
    ProductosComponent,
    HomeComponent,
    PedidosComponent,
    FacturasComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
