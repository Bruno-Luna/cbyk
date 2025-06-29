import { UsuarioService } from '../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../model/usuario.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EnderecoModalComponent } from '../../modal/endereco-modal.component';


@Component({
  selector: 'app-usuario-read',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule],
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.css']
})
export class UsuarioReadComponent implements OnInit {

  usuarios: UsuarioModel[]
  modalRef?: BsModalRef;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.usuarioService.readUsuario().subscribe(usuario =>{
      this.usuarios = usuario
    })
  }

  abrirModal(usuario: UsuarioModel) {
    this.modalRef = this.modalService.show(EnderecoModalComponent, {
      initialState: {
        usuario: usuario
      }
    });
  }


}
