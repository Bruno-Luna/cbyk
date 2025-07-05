package br.com.cbyk.controller;

import br.com.cbyk.model.UsuarioModel;
import br.com.cbyk.repository.UsuarioRepository;
import br.com.cbyk.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/listar")
    public ResponseEntity<Page<UsuarioModel>> listarUsuarios(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<UsuarioModel> usuarioPage = usuarioRepository.findAll(pageable);

        if (usuarioPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(usuarioPage);
        }
    }


    @GetMapping("/id/{id}")
    public ResponseEntity<UsuarioModel> getByIdUsuario(@PathVariable(value = "id") UUID id) {
        Optional<UsuarioModel> usuarioBuscado = usuarioRepository.findById(id);

        if (usuarioBuscado.isPresent()) {
            return ResponseEntity.status(200).body(usuarioBuscado.get());
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<UsuarioModel>> getAllByName(@PathVariable(value = "nome") String nome) {
        List<UsuarioModel> objetoNome = usuarioRepository.findAllByNomeContainingIgnoreCase(nome);

        if (objetoNome.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(200).body(objetoNome);
        }
    }


    @PostMapping
    public ResponseEntity<UsuarioModel> cadastrar(@Valid @RequestBody UsuarioModel usuarioModel) {

        return usuarioService
                .cadastrarUsuairo(usuarioModel)
                .map(resp -> ResponseEntity.status(HttpStatus.CREATED).body((UsuarioModel) resp))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "E-mail ou Usuário já existente!"
                ));
    }

    @PutMapping("/atualizar")
    public ResponseEntity<UsuarioModel> atualizar(@Valid @RequestBody UsuarioModel usuarioModel) {
        return ResponseEntity.status(202).body(usuarioRepository.save(usuarioModel));
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable(value = "id") UUID id) {
        usuarioRepository.deleteById(id);
    }

}
