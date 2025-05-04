package com.agustin.server.services;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.UserDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<UserDTO> getAllUsers();
   //UserDTO getUserById(UUID userId);
   //UserDTO createUser(User user);
   //UserDTO updateUser(UUID userId, User user);
   //void deleteUser(UUID userId);
}
