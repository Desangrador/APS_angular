import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasComponent } from './paginas/facturas/facturas.component';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { VentasComponent } from './paginas/ventas/ventas.component';

const rutas: Routes = [
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'lotes',
    component: LotesComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'facturas',
    component: FacturasComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  }
]
@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(rutas) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
