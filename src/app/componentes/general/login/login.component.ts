import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  cargando = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router ) {

    
    this.form=this.fb.group(
      {
        usuario:['guest', Validators.required],
        password:['guest', Validators.required]

      }
    );
   }

  ngOnInit(): void {
  }

  
  onEntrar() {

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario == 'guest' && password == 'guest'){
      //Redireccionamos a dashboard
      this.fakeLoading();

    }
    else {
      // Mostramos mensaje de error
      this.error();
      this.form.reset();
    }

  }

  error() {
    this.snackBar.open('Usuario o contraseña no válida', '', {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

  }

  fakeLoading() {

    this.cargando = true;

    setTimeout(() => {
      this.router.navigate(['./dashboard']);
      
    }, 500);
  }


}
