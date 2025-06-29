import { AlertService } from '../../service/alert.service';
import { UsuarioService } from '../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioModel } from '../../model/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  createUsuario() {

    this.usuarioService.postUsuario(this.usuario).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
      this.router.navigate(['/usuario'])
      this.alert.alertSuccess('Usuário registrado!')

    }, erro => {
      if (erro.status == 401) {
        this.alert.alertDanger('Email já cadastrado. Por favor, cadastrar outro.')
      }

      let errors = '';
      if (erro.error.errors.length > 0) {
        for (const error of erro.error.errors) {
          errors += `* ${error.defaultMessage}\n`;
        }        
        this.alert.alertInfo(`Atenção aos campos:\n ${errors}`);
      }

    })
  }

}

