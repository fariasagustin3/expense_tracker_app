package com.agustin.server.controllers;

import com.agustin.server.dtos.requests.UserRequest;
import com.agustin.server.dtos.responses.UserDTO;
import com.agustin.server.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private UUID userId;
    private UserDTO userDTO;
    private UserRequest userRequest;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

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
    @DisplayName("Should return UserDTO when getProfile is called with valid ID")
    void getProfileByValidId() {
        // arrange
        when(userService.getProfile(userId)).thenReturn(userDTO);

        // act
        UserDTO result = userController.getProfile(userId);

        // assert
        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("Agustin", result.getFirstName());
        assertEquals("Farias", result.getLastName());
        assertEquals("agus@mail.com", result.getEmail());

        verify(userService, times(1)).getProfile(userId);
    }
}
