import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  comenzar: boolean = false;
  desabilitar: boolean = false;
  cuadrados: any = [];
  mensaje: string = '';
  mostrarMensaje: boolean = false;


  //meter datos a la db
  constructor() {
    this.cuadrados = new Array(9);
  }

  ngOnInit(): void {
  }

  comenzarJuego() {
    this.comenzar = true;
  }

  jugar(casillero: number) {
    if (this.cuadrados[casillero] == null) {
      this.cuadrados[casillero] = "x";

      if (this.verificarGanador("x")) {
        //this.cargarVictoria();
        this.mostrarResultado("Tu Ganas!!");
      }
      else {
        if (this.verificarEmpate()) {
          this.mostrarResultado("Empate!!");
        }
        else {
          this.desabilitar = true;
          this.jugarCpu();

          if (this.verificarGanador("o")) {
            //this.cargarPerdida();
            this.mostrarResultado("Tu Pierdes!!");
          }
          else {
            if (this.verificarEmpate()) {
              this.mostrarResultado("Empate");
            }
          }
        }
      }
    }
  }

  /*
  cargarVictoria() {
    this.resultadoService.gano("tateti");
  }

  cargarPerdida() {
    this.resultadoService.perdio("tateti");
  }*/

  jugarCpu() {
    let casillaHabilitada = false;
    let casilla;

    do {
      casilla = Math.floor(Math.random() * 9 + 0);

      if (this.cuadrados[casilla] == null) {
        casillaHabilitada = true;
      }
    } while (!casillaHabilitada);

    this.cuadrados[casilla] = "o";
    this.desabilitar = false;
  }

  verificarGanador(jugador: string) {
    //FILAS
    if (this.cuadrados[0] == jugador && this.cuadrados[1] == jugador && this.cuadrados[2] == jugador) {
      return true;
    }
    if (this.cuadrados[3] == jugador && this.cuadrados[4] == jugador && this.cuadrados[5] == jugador) {
      return true;
    }
    if (this.cuadrados[6] == jugador && this.cuadrados[7] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    //COLUMNAS
    if (this.cuadrados[0] == jugador && this.cuadrados[3] == jugador && this.cuadrados[6] == jugador) {
      return true;
    }
    if (this.cuadrados[1] == jugador && this.cuadrados[4] == jugador && this.cuadrados[7] == jugador) {
      return true;
    }
    if (this.cuadrados[2] == jugador && this.cuadrados[5] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    //DIAGONALES
    if (this.cuadrados[0] == jugador && this.cuadrados[4] == jugador && this.cuadrados[8] == jugador) {
      return true;
    }
    if (this.cuadrados[2] == jugador && this.cuadrados[4] == jugador && this.cuadrados[6] == jugador) {
      return true;
    }
    return false;
  }

  verificarEmpate() {
    let contador = 0;
    
    this.cuadrados.forEach((casillero: null) => {
      if (casillero != null){
         contador++;
      } 
    });

    if (contador == 9) {
      return true;
    } 
    else {
      return false;
    }
  }

  mostrarResultado(mensaje: string) {
    this.mensaje = mensaje;
    this.mostrarMensaje = true;
    setTimeout(() => this.reiniciar(), 3000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.cuadrados = new Array(9);
    this.comenzar = false;
  }

}
