import { AlertService } from '../../service/alert.service';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioModel } from '../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-delete',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

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

  ngOnInit(): void {
    let idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(idUsuario)
  }

  findByIdUsuario(id: number) {
    this.usuarioService.findByIdUsuario(id).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
    })
  }

  removeUsuario() {
    this.usuarioService.deleteUsuario(this.usuario.id).subscribe(() => {
      this.router.navigate(['/usuario'])
      this.alert.alertDanger('Usuário apagado!')
    })

  }

  cancel() {
    this.router.navigate(['/usuario'])
  }

}
