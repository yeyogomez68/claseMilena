import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private titulo:Title
  ) {
    titulo.setTitle('Registro')
  }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    })
  }

  registrarUsuario(){
    this.usuarioService.userSignUp(this.usuarioForm.get('nombre')?.value, this.usuarioForm.get('password')?.value)
    .subscribe(res => {
      console.log(res)
      this.router.navigate([`/signin`])
      this.showSuccess()
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    })
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, "Registro exitoso");
  }
}
