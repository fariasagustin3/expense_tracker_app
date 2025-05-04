package com.agustin.server.services.impl;

import com.agustin.server.dtos.UserDTO;
import com.agustin.server.mappers.UserMapper;
import com.agustin.server.repositories.UserRepository;
import com.agustin.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }
}

