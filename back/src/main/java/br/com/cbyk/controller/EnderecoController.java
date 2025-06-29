package br.com.cbyk.controller;

import br.com.cbyk.dto.EnderecoDTO;
import br.com.cbyk.model.EnderecoModel;
import br.com.cbyk.model.UsuarioModel;
import br.com.cbyk.repository.EnderecoRepository;
import br.com.cbyk.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> salvar(@Valid @RequestBody EnderecoDTO dto) {
        UsuarioModel usuarioBuscado = usuarioRepository.getById(dto.getUsuarioId());

        EnderecoModel endereco = new EnderecoModel();
        endereco.setLogradouro(dto.getLogradouro());
        endereco.setNumero(dto.getNumero());
        endereco.setComplemento(dto.getComplemento());
        endereco.setBairro(dto.getBairro());
        endereco.setLocalidade(dto.getLocalidade());
        endereco.setEstado(dto.getEstado());
        endereco.setCep(dto.getCep());
        endereco.setUsuario(usuarioBuscado);

        EnderecoModel salvo = enderecoRepository.save(endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping("/usuario/{id}")
    public List<EnderecoModel> getByIdUsuario(@PathVariable(value = "id") UUID id) {
        return enderecoRepository.findByUsuarioId(id);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletarEndereco(@PathVariable(value = "id") UUID id) {
        enderecoRepository.deleteById(id);
    }

}


