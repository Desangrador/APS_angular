import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { ProductosComponent } from './paginas/productos/productos.component';

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
  }
]
@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(rutas) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
