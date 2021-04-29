import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-adivinar-moneda',
  templateUrl: './adivinar-moneda.component.html',
  styleUrls: ['./adivinar-moneda.component.css']
})
export class AdivinarMonedaComponent implements OnInit {

  imagenIzquierda = './../../../assets/moneda/puñoizq.png';
  imagenDerecha = './../../../assets/moneda/puñoder.png';

  contadorPierde = 0;
  contadorGana = 0;

  mostrarAlert = false;
  mensajeAlert = '';

  disableIzq = false;
  disableDer = false;

  usuario: User = new User();
  nombre = '';

  constructor(public UsuarioService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.UsuarioService.usuario;
    this.nombre = this.UsuarioService.usuario.nombre;
  }


  mostrarAlerta(error: string) {
    this.mostrarAlert = true;
    this.mensajeAlert = error;
  }
  noMostrarAlert() {
    this.mostrarAlert = false;
  }


  reseteoImagenes() {
    this.imagenIzquierda = './../../../assets/moneda/puñoizq.png';
    this.imagenDerecha = './../../../assets/moneda/puñoder.png';
  }

  ClickIzquierdo() {
    //random 1 o 2
    let random = Math.floor(Math.random() * 2) + 1;

    if (random === 1) {
      this.mostrarAlerta(`VICTORIA!!! ${this.usuario.nombre}!`);
      this.imagenIzquierda = './../../../assets/moneda/abiertaizqmoneda.png';
      this.imagenDerecha = './../../../assets/moneda/abiertader.png';
      this.usuario.puntajemoneda = this.usuario.puntajemoneda + 1;
      this.usuario.puntaje = this.usuario.puntaje + 1;

      this.contadorGana++;
    } else {
      this.mostrarAlerta(`TU PIERDES!!! ${this.usuario.nombre}!`);
      this.imagenIzquierda = './../../../assets/moneda/abiertaizq.png';
      this.imagenDerecha = './../../../assets/moneda/abiertadermoneda.png';
      this.contadorPierde++;
    }
    this.disableIzq = true;
    this.disableDer = true;

    timer(2000).subscribe(() => {
      this.reseteoImagenes();
      this.disableIzq = false;
      this.disableDer = false;
    });

  }

  ClickDerecha() {
    let random = Math.floor(Math.random() * 2) + 1;

    if (random === 1) {
      this.mostrarAlerta(`VICTORIA!!!  ${this.usuario.nombre}!`);
      this.imagenIzquierda = './../../../assets/moneda/abiertaizq.png';
      this.imagenDerecha = './../../../assets/moneda/abiertadermoneda.png';
      this.usuario.puntajemoneda = this.usuario.puntajemoneda + 1;
      this.usuario.puntaje = this.usuario.puntaje + 1;

      this.contadorGana++;
    } else {
      this.mostrarAlerta(`TU PIERDES!!! ${this.usuario.nombre}!`);
      this.imagenIzquierda = './../../../assets/moneda/abiertaizqmoneda.png';
      this.imagenDerecha = './../../../assets/moneda/abiertader.png';
      this.contadorPierde++;
    }
    this.disableIzq = true;
    this.disableDer = true;

    timer(2000).subscribe(() => {
      this.reseteoImagenes();
      this.disableIzq = false;
      this.disableDer = false;
    });
  }

}
