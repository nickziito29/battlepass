package com.battlepass.controller;

import com.battlepass.model.User;
import com.battlepass.service.UserService;
import com.battlepass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    // LISTAR TODOS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    // CRIAR USUÁRIO
    @PostMapping
    public User createUser(@RequestBody User user) {
        // Garante que todo usuário novo começa como BASE_USER
        user.getRoles().add(com.battlepass.model.UserRole.BASE_USER);
        return userRepository.save(user);
    }

    // ATUALIZAR USUÁRIO
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updated) {
        User user = userService.findById(id);

        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        if (updated.getPassword() != null) {
            user.setPassword(updated.getPassword());
        }

        return userRepository.save(user);
    }

    // DELETAR USUÁRIO
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
