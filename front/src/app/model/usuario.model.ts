import { EnderecoModel } from "./endereco.model";

export class UsuarioModel{

    public id: number
    public nome: string
    public email: string
    public senha: string

    public enderecos?: EnderecoModel;
}