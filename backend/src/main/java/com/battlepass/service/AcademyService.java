package com.battlepass.service;

import com.battlepass.model.Academy;
import com.battlepass.model.User;
import com.battlepass.repository.AcademyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AcademyService {

    private final AcademyRepository academyRepository;
    private final UserService userService;

    public Academy createAcademy(Academy academy, Long ownerId) {
        User owner = userService.findById(ownerId);
        userService.promoteToAcademyOwner(owner);

        academy.setOwner(owner);
        return academyRepository.save(academy);
    }

    public User addProfessor(Long academyId, Long userId) {
        Academy academy = academyRepository.findById(academyId)
                .orElseThrow(() -> new RuntimeException("Academy not found"));

        User user = userService.findById(userId);
        userService.promoteToProfessor(user);

        academy.getProfessors().add(user);
        academyRepository.save(academy);

        return user;
    }

    public User addAthlete(Long academyId, Long userId) {
        Academy academy = academyRepository.findById(academyId)
                .orElseThrow(() -> new RuntimeException("Academy not found"));

        User user = userService.findById(userId);
        userService.promoteToAthlete(user);

        academy.getAthletes().add(user);
        academyRepository.save(academy);

        return user;
    }
}
