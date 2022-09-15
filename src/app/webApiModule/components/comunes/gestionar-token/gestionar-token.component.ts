import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-gestionar-token',
  templateUrl: './gestionar-token.component.html',
  styleUrls: ['./gestionar-token.component.css']
})
export class GestionarTokenComponent implements OnInit {
  
  tokenActual: string;
  token: string;
  form: FormGroup;
  nombreBotonModificarToken: string = 'Añadir token'


  constructor(private was: OpenApi3Service, private fb: FormBuilder) { 




  }

  ngOnInit(): void {

    
    
    this.was.tokenActual$
    .pipe(
      take(1)
    )
    .subscribe(
      tokenActual => {
        this.tokenActual = tokenActual;
        this.token?this.nombreBotonModificarToken='Modificar Token': this.nombreBotonModificarToken= 'Definir Token';
      }
    );

    this.crearFormulario()
  }

  crearFormulario(){

    this.form = this.fb.group({
      token: ''
    })
  }

  onEstablecerToken() {

    this.was.establecerToken(this.form.controls['token'].value);

  }

}
