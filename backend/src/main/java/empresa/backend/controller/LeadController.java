package empresa.backend.controller;

import org.springframework.web.bind.annotation.*;
import empresa.backend.model.Lead;
import empresa.backend.repository.LeadRepository;
import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:3000") // <--- ¡Esto es vital!
public class LeadController {
    private final LeadRepository repository;

    public LeadController(LeadRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return repository.findAll();
    }

    @PostMapping
    public Lead createLead(@RequestBody Lead lead) {
        return repository.save(lead);
    }
}