import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EnderecoModel } from '../model/endereco.model';
import { EnderecoService } from '../service/endereco.service';
import { AlertService } from '../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioModel } from '../model/usuario.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-endereco-modal',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './endereco-modal.component.html'
})
export class EnderecoModalComponent {

  endereco: EnderecoModel = new EnderecoModel()
  usuario!: UsuarioModel
  bootstrap: any;

  constructor(
    public bsModalRef: BsModalRef,
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  buscarEnderecoPorCep() {
    this.enderecoService.getEnderecoPorCep(this.endereco.cep).subscribe({
      next: (resp: EnderecoModel) => {
        this.endereco = resp;

        if ((resp as any).erro) {
          this.alert.alertDanger('CEP não encontrado!')
          return;
        }
        this.alert.alertSuccess('CEP encontrado!')
      },
      error: (err) => {
      }
    });
  }

  salvar() {

    this.endereco.usuarioId = this.usuario.id;

    this.enderecoService.postEndereco(this.endereco).subscribe((resp: EnderecoModel) => {
      this.endereco = resp
      this.alert.alertSuccess('Endereço registrado!')
      this.endereco = new EnderecoModel();
    }, erro => {
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

