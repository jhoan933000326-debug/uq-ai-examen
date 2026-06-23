package empresa.backend.controller;

import empresa.backend.model.Usuario;
import empresa.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
// Esta es la línea corregida para permitir tu dominio de Vercel y localhost
@CrossOrigin(origins = {"http://localhost:3000", "https://uq-ai-examen.vercel.app"}, allowCredentials = "true")
public class AuthController {
    
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuario.getEmail() == null || usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email es inválido o ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setBloqueado(false);
        usuario.setIntentosFallidos(0);
        if (usuario.getRol() == null) usuario.setRol("USER");
        if (usuario.getArea() == null) usuario.setArea("GENERAL");
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data, HttpServletResponse response) {
        String email = data.get("email");
        String pass = data.get("password");

        return usuarioRepository.findByEmail(email).map(u -> {
            if (u.isBloqueado()) return ResponseEntity.status(403).body("Cuenta bloqueada");
            
            if (passwordEncoder.matches(pass, u.getPassword())) {
                u.setIntentosFallidos(0);
                usuarioRepository.save(u);
                
                // Configuración estricta de seguridad
                response.setHeader("Set-Cookie", "token=autenticado; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600");
                
                // Devolvemos el rol para control de acceso (RBAC)
                return ResponseEntity.ok(Map.of("mensaje", "Login exitoso", "rol", u.getRol()));
            }

            u.setIntentosFallidos(u.getIntentosFallidos() + 1);
            if (u.getIntentosFallidos() >= 3) u.setBloqueado(true);
            usuarioRepository.save(u);
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }).orElse(ResponseEntity.status(401).body("Usuario no encontrado"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Logout seguro eliminando la cookie en servidor
        response.setHeader("Set-Cookie", "token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0");
        return ResponseEntity.ok("Sesión cerrada correctamente");
    }
}