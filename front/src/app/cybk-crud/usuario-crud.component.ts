import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioModel } from '../model/usuario.model';
import { FormsModule } from '@angular/forms';
import { UsuarioReadComponent } from './usuario-read/usuario-read.component';

@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [FormsModule, UsuarioReadComponent, RouterModule],
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  listarUsuario: UsuarioModel[]
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }



}
