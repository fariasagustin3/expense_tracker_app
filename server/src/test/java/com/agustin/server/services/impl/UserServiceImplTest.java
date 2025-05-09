package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.UserRequest;
import com.agustin.server.dtos.responses.UserDTO;
import com.agustin.server.mappers.UserMapper;
import com.agustin.server.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private UUID userId;
    private User user;
    private UserDTO userDTO;
    private UserRequest userRequest;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        // configure test data
        user = new User();
        user.setId(userId);
        user.setFirstName("Agustin");
        user.setLastName("Farias");
        user.setEmail("agus@mail.com");

        userDTO = new UserDTO();
        userDTO.setId(userId);
        userDTO.setFirstName("Agustin");
        userDTO.setLastName("Farias");
        userDTO.setEmail("agus@mail.com");

        userRequest = new UserRequest();
        userRequest.setFirstName("Jane");
        userRequest.setLastName("Doe");
        userRequest.setEmail("jane@mail.com");
    }

    @Test
    @DisplayName("Should return UserDTO when user exists")
    void getProfileWhenUserExists() {
        // arrange
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toDto(user)).thenReturn(userDTO);

        // act
        UserDTO result = userService.getProfile(userId);

        // assert
        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("Agustin", result.getFirstName());
        assertEquals("Farias", result.getLastName());
        assertEquals("agus@mail.com", result.getEmail());

        verify(userRepository, times(1)).findById(userId);
        verify(userMapper, times(1)).toDto(user);
    }

    @Test
    @DisplayName("Should throw IllegalArgumentException when user is not found in getProfile()")
    void shouldThrowExceptionWhenUserNotFound() {
        // arrange
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // act & assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userService.getProfile(userId)
        );

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findById(userId);
        verify(userMapper, never()).toDto(any());
    }
}
