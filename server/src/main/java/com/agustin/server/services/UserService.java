package com.agustin.server.services;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.LoginRequest;
import com.agustin.server.dtos.responses.UserDTO;

import java.util.List;

public interface UserService {

    List<UserDTO> getAllUsers();
   //UserDTO getUserById(UUID userId);
   UserDTO createUser(User user);
   UserDTO loginUser(LoginRequest loginRequest);
   //UserDTO updateUser(UUID userId, User user);
   //void deleteUser(UUID userId);
}
