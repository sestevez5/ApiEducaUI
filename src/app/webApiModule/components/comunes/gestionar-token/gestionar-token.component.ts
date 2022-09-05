import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-token',
  templateUrl: './gestionar-token.component.html',
  styleUrls: ['./gestionar-token.component.css']
})
export class GestionarTokenComponent implements OnInit {
  
  token: string;
  form: FormGroup;
  nombreBotonModificarToken: string = 'Añadir token'


  constructor(private was: OpenApi3Service, private fb: FormBuilder) { 

    this.was.tokenActual$.subscribe(
      nuevoToken => {
        this.token = nuevoToken;
        console.log(nuevoToken);
        this.token?this.nombreBotonModificarToken='Modificar Token': this.nombreBotonModificarToken= 'Definir Token';
      }
    );

    this.crearFormulario()
  }

  crearFormulario(){

    this.form = this.fb.group({
      token: this.token
    })


  }

  ngOnInit(): void {
  }

  onEstablecerToken() {

    this.was.establecerToken(this.form.controls['token'].value);

  }

}
