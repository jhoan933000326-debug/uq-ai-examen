package empresa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import empresa.backend.model.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {
}