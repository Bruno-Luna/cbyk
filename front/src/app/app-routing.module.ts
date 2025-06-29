import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsuarioCrudComponent } from './cybk-crud/usuario-crud.component';
import { UsuarioCreateComponent } from './cybk-crud/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './cybk-crud/usuario-update/usuario-update.component';
import { UsuarioDeleteComponent } from './cybk-crud/usuario-delete/usuario-delete.component';
import { UsuarioEnderecoComponent } from './cybk-crud/usuario-endereco/usuario-endereco.component';


const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'home', component: HomeComponent },
  { path: 'usuario', component: UsuarioCrudComponent },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: 'usuario/update/:id', component: UsuarioUpdateComponent },
  { path: 'usuario/delete/:id', component: UsuarioDeleteComponent },
  { path: 'usuario/endereco/:id', component: UsuarioEnderecoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
