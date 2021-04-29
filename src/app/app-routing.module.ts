import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { HomeComponent } from './components/home/home.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';
import { TaTeTiComponent } from './components/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './components/memotest/memotest.component';
//import { CaraCruzComponent } from './components/cara-cruz/cara-cruz.component';
import { AdivinarMonedaComponent } from './components/adivinar-moneda/adivinar-moneda.component';

const routes: Routes = [
  { //inicio
    path: '', 
    redirectTo: 'login',
    pathMatch:'full'
  },
  { 
    path: 'registro', 
    component: RegistroComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'quienSoy',
    component: QuienSoyComponent 
  },
  { 
    path: 'home',
    component: HomeComponent 
  },
  { 
    path: 'piedraPapelTijera',
    component: PiedraPapelTijeraComponent 
  },
  { 
    path: 'tateti',
    component: TaTeTiComponent 
  },
  {
    path: 'memotest',
    component: MemotestComponent
  },
  {
    path: 'adivinaMoneda',
    component: AdivinarMonedaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
