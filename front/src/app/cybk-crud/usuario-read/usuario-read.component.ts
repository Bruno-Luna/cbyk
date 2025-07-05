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
  page = 0;
  size = 5;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  abrirModal(usuario: UsuarioModel) {
    this.modalRef = this.modalService.show(EnderecoModalComponent, {
      initialState: {
        usuario: usuario
      }
    });
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios(this.page, this.size).subscribe(data => {
      this.usuarios = data.content;
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;

    });
  }

  proximaPagina(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.carregarUsuarios();
    }
  }

  paginaAnterior(): void {
    if (this.page > 0) {
      this.page--;
      this.carregarUsuarios();
    }
  }




}
