package br.com.cbyk.repository;

import br.com.cbyk.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, UUID> {

    public List<UsuarioModel> findAllByNomeContainingIgnoreCase(String nome);

    public Optional<UsuarioModel> findByEmail(String email);


}
