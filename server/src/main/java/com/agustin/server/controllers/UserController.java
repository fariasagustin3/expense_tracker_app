package com.agustin.server.controllers;

import com.agustin.server.dtos.responses.UserDTO;
import com.agustin.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}/me")
    public UserDTO getProfile(@PathVariable UUID id) {
        return userService.getProfile(id);
    }
}
