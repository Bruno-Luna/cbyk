package br.com.cbyk.service;

import br.com.cbyk.model.UsuarioModel;
import br.com.cbyk.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Object> cadastrarUsuairo(UsuarioModel usuarioModel) {
        return usuarioRepository.findByEmail(usuarioModel.getEmail()).map(usuarioExistente -> {
            return Optional.empty();
        }).orElseGet(() -> {
            usuarioModel.setEmail(usuarioModel.getEmail());

            return usuarioRepository.findByEmail(usuarioModel.getEmail()).map(usuarioExistente -> {
                return Optional.empty();
            }).orElseGet(() -> {
                usuarioModel.setEmail(usuarioModel.getEmail());
                return Optional.ofNullable(usuarioRepository.save(usuarioModel));
            });
        });
    }
}
