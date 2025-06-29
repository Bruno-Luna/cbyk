import { EnderecoModel } from '../model/endereco.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(
    private http: HttpClient
  ) { }

  postEndereco(endereco: EnderecoModel): Observable<EnderecoModel> {
    return this.http.post<EnderecoModel>('http://localhost:8080/api/v1/endereco', endereco)
  }

  deleteEndereco(id: number): Observable<EnderecoModel> {
    return this.http.delete<EnderecoModel>(`http://localhost:8080/api/v1/endereco/deletar/${id}`)
  }

  getEnderecoPorCep(cep: string): Observable<EnderecoModel> {
    return this.http.get<EnderecoModel>(`https://viacep.com.br/ws/${cep}/json/`)
  }

  listarEnderecoPorUsuarioId(id: string): Observable<EnderecoModel[]> {
    return this.http.get<EnderecoModel[]>(`http://localhost:8080/api/v1/endereco/usuario/${id}`)
  }
  
}
