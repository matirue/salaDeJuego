import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: boolean= false;
  

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { 
    
  } 

  auth(){
    this.authService.getUsuario_service().then(user =>{
      if(user != null){
        this.user = true;
      }
    })
  }

  CerrarSesion(){
    localStorage.removeItem('userCurrent');
      this.user = false;
      this.authService.Desloguearse_service();
  }

  ngOnInit(): void {
  }

}


