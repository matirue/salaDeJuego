import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User_Mensaje } from 'src/app/class/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollframe', { static: false })
  scrollFrame!: ElementRef;

  @ViewChildren('item')
  itemElements!: QueryList<any>;

  elMensaje: User_Mensaje;
  dateTime = new Date();
  token: any;
  item$: Observable<any[]>;

  private scrollDeContenido: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    //private auth_fb: FirebaseService
    private auth_fb: AuthService
  ) {
    this.elMensaje = new User_Mensaje();
    this.elMensaje.usuario = localStorage.getItem('token') || 'Fantasma';
    this.elMensaje.fecha = this.dateTime.getDay() +'-'+this.dateTime.getHours() +':'+ this.dateTime.getMinutes();

    //this.item$ = auth_fb.LeerTodo().valueChanges();
    this.item$ = auth_fb.getAll().valueChanges();
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    /*if (this.token == null) {
      this.router.navigateByUrl("login");
    }*/
  }

  EnviarMensaje(){
    this.auth.Crear(this.elMensaje).then(() => {
      this.elMensaje.mensaje = '';
      console.log('enviado a FB', this.token);
    });
  }

  ngAfterViewInit() {
    this.scrollDeContenido = this.scrollFrame.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());  
  }
  
  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollDeContenido.scroll({
      top: this.scrollDeContenido.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }



}
