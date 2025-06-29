package br.com.cbyk.repository;

import br.com.cbyk.model.EnderecoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * @author Bruno Luna
 * @version 1.0
 * @since 06/2025
 */

@Repository
public interface EnderecoRepository extends JpaRepository<EnderecoModel, UUID> {

    public List<EnderecoModel> findByUsuarioId(UUID idusuario);
}
