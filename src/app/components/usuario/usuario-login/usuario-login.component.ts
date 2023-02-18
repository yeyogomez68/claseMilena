import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignInRq } from '../models/userSignIn.model';


@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  helper = new JwtHelperService();
  loginDto: UserSignInRq;
  viewPassword: boolean = false;

  @Output() closeLogin = new EventEmitter<boolean>();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }


  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });    
  }

  error = false

  onLogInUsuario(){
    this.error = false
    this.loginDto = this.loginForm.value;
    this.usuarioService.userLogIn(this.loginDto)
    .subscribe(res => {
      console.log(res);
      const token = res.token;
      sessionStorage.setItem('token', token);
      this.router.navigate(['/login']);
      this.showSuccess()
    },
    error => {
      console.error(error);
      this.error=true
    })
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Ha ingresado exitosamente`, "Inicio exitoso");
  }

  changeType(id: string) {
    const type = document.getElementById(id)?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById(id)?.setAttribute('type', type);
    this.viewPassword = !this.viewPassword;
  }

  close() {
    this.closeLogin.emit(false);
  }

}
