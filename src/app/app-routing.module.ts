import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LotesComponent } from './paginas/lotes/lotes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { ProductosComponent } from './paginas/productos/productos.component';

const rutas: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/productos',
    component: ProductosComponent
  },
  {
    path: 'home/lotes',
    component: LotesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/pedidos',
    component: PedidosComponent
  }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(rutas) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
