import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOutComponent } from './components/home-out/home-out.component';
import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './components/usuario/usuario-signup/usuario-signup.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: HomeOutComponent,
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
