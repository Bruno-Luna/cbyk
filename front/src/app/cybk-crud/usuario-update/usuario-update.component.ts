import { AlertService } from '../../service/alert.service';
import { UsuarioModel } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-update',
  imports: [FormsModule, RouterModule],
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: UsuarioModel = {
    id: 0,
    nome: '',
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
    let idUsuario = this.route.snapshot.params['id']

    this.findByIdUsuario(idUsuario)
  }

  findByIdUsuario(id: number) {
    this.usuarioService.findByIdUsuario(id).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
    })
  }

  updateUsuario() {
    this.usuarioService.updateUsuario(this.usuario).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
      this.router.navigate(['/usuario'])
      this.alert.alertSuccess('Usuário atualizado!')
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

  cancel(): void {
    this.router.navigate(['/usuario'])
  }

}
