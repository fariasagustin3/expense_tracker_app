package com.agustin.server.services;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.LoginRequest;
import com.agustin.server.dtos.responses.UserDTO;

import java.util.List;

public interface UserService {

    List<UserDTO> getAllUsers();
}