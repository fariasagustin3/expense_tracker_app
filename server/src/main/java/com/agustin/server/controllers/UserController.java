package com.agustin.server.controllers;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.LoginRequest;
import com.agustin.server.dtos.responses.UserDTO;
import com.agustin.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserDTO createUser(@RequestBody User user) {
        System.out.println(user);
        return userService.createUser(user);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            UserDTO userDTO = userService.loginUser(loginRequest);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch(IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
