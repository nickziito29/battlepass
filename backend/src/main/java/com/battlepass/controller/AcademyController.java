package com.battlepass.controller;

import com.battlepass.model.Academy;
import com.battlepass.model.User;
import com.battlepass.service.AcademyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/academies")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AcademyController {

    private final AcademyService academyService;

    @PostMapping
    public Academy createAcademy(@RequestBody Academy academy,
                                 @RequestParam Long ownerId) {
        return academyService.createAcademy(academy, ownerId);
    }

    @PostMapping("/{id}/professors")
    public User addProfessor(@PathVariable Long id,
                             @RequestParam Long userId) {
        return academyService.addProfessor(id, userId);
    }

    @PostMapping("/{id}/athletes")
    public User addAthlete(@PathVariable Long id,
                           @RequestParam Long userId) {
        return academyService.addAthlete(id, userId);
    }
}