package com.battlepass.service;

import com.battlepass.model.User;
import com.battlepass.model.UserRole;
import com.battlepass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public User findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void promoteToAcademyOwner(User user) {
        user.getRoles().add(UserRole.ACADEMY_OWNER);
        repository.save(user);
    }

    public void promoteToProfessor(User user) {
        user.getRoles().add(UserRole.PROFESSOR);
        repository.save(user);
    }

    public void promoteToAthlete(User user) {
        user.getRoles().add(UserRole.ATHLETE);
        repository.save(user);
    }
}
