package br.com.cbyk.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

public class EnderecoDTO {

    @NotBlank(message = "Logradouro obrigatório.")
    private String logradouro;

    @NotBlank(message = "Número obrigatório.")
    private String numero;

    private String complemento;

    @NotBlank(message = "Bairro obrigatório.")
    private String bairro;

    @NotBlank(message = "Cidade obrigatória.")
    private String localidade;

    @NotBlank(message = "Estado obrigatório.")
    private String estado;

    @NotBlank(message = "CEP obrigatório.")
    private String cep;

    @NotNull(message = "ID do usuário é obrigatório.")
    private UUID usuarioId;

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLocalidade() {
        return localidade;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public UUID getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(UUID usuarioId) {
        this.usuarioId = usuarioId;
    }
}