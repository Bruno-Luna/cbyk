import { UsuarioModel } from './../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  postUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>('http://localhost:8080/api/v1/usuario', usuario)
  }

  readUsuario(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>('http://localhost:8080/api/v1/usuario/listartodos')
  }

  listarUsuarios(page: number, size: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/usuario/listar?page=${page}&size=${size}`);
  }

  findByIdUsuario(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`http://localhost:8080/api/v1/usuario/id/${id}`)
  }

  updateUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>('http://localhost:8080/api/v1/usuario/atualizar', usuario)
  }

  deleteUsuario(id: number): Observable<UsuarioModel> {
    return this.http.delete<UsuarioModel>(`http://localhost:8080/api/v1/usuario/${id}`)
  }
}
