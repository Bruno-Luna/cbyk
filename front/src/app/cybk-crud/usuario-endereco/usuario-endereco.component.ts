import { AlertService } from '../../service/alert.service';
import { UsuarioModel } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnderecoService } from '../../service/endereco.service';
import { EnderecoModel } from '../../model/endereco.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-usuario-endereco',
  imports: [FormsModule, RouterModule, NgFor],
  templateUrl: './usuario-endereco.component.html',
  styleUrls: ['./usuario-endereco.component.css']
})
export class UsuarioEnderecoComponent implements OnInit {

  enderecos: EnderecoModel[] = []
  idUsuario: any
  page = 0;
  size = 5;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.params['id']
    this.carregarEnderecosPorUsuarioId();
  }



  deletarEndereco(endereco: EnderecoModel) {
    console.log("🚀 ~ UsuarioEnderecoComponent ~ deletarEndereco ~ id:", endereco.id);
    this.enderecoService.deleteEndereco(endereco.id).subscribe(() => {
      this.alert.alertDanger('Endereço apagado!')
      this.carregarEnderecosPorUsuarioId();

    })

  }

  carregarEnderecosPorUsuarioId(): void {
    this.enderecoService.listarEnderecoPorUsuarioId(this.page, this.size, this.idUsuario).subscribe(data => {
      this.enderecos = data.content;
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
    });
  }

  proximaPagina(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.carregarEnderecosPorUsuarioId();
    }
  }

  paginaAnterior(): void {
    if (this.page > 0) {
      this.page--;
      this.carregarEnderecosPorUsuarioId();
    }
  }

}
