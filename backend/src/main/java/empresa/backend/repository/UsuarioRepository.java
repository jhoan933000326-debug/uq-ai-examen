package empresa.backend.repository;

import empresa.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Corregido: usamos findByEmail porque tu entidad Usuario usa 'email'
    Optional<Usuario> findByEmail(String email);
}