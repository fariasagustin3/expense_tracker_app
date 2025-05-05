package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.LoginRequest;
import com.agustin.server.dtos.responses.UserDTO;
import com.agustin.server.mappers.UserMapper;
import com.agustin.server.repositories.UserRepository;
import com.agustin.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDTO createUser(User user) {
        System.out.println(user);
        if(user.getFirstName() == null) {
            throw new IllegalArgumentException("First Name is required");
        }
        if(user.getLastName() == null) {
            throw new IllegalArgumentException("Last Name is required");
        }
        if(user.getEmail() == null) {
            throw new IllegalArgumentException("Email is required");
        }
        if(user.getPassword() == null) {
            throw new IllegalArgumentException("Password is required");
        }

        String securedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(securedPassword);

        User userCreated = userRepository.save(user);
        System.out.println(user);

        return userMapper.toDto(userCreated);
    }

    @Override
    public UserDTO loginUser(LoginRequest loginRequest) {
        User savedUser = userRepository.findByEmail(loginRequest.getEmail());

        if(savedUser == null) {
            throw new IllegalArgumentException("User does not exist.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), savedUser.getPassword())) {
            throw new IllegalArgumentException("Wrong credentials");
        }

        return userMapper.toDto(savedUser);

    }
}

