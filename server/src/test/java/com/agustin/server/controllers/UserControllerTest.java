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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
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

    @Test
    @DisplayName("Should return ResponseEntity with UserDTO when updateUser is called with valid data")
    void updateUserAndReturnResponseEntityWithUserDTO() {
        // arrange
        UserDTO updatedUserDTO = new UserDTO();
        updatedUserDTO.setId(userId);
        updatedUserDTO.setFirstName("Agustin");
        updatedUserDTO.setLastName("Farias");
        updatedUserDTO.setEmail("agus@mail.com");

        when(userService.updateUser(userId, userRequest)).thenReturn(updatedUserDTO);

        // act
        ResponseEntity<UserDTO> response = userController.updateUser(userId, userRequest);

        // assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUserDTO, response.getBody());

        verify(userService, times(1)).updateUser(userId, userRequest);
    }

    @Test
    @DisplayName("Should handle IllegalArgumentException when updatedUser service throws it")
    void throwExceptionWhenUserIsNotFound() {
        // arrange
        String errorMessage = "User not found";
        when(userService.updateUser(userId, userRequest)).thenThrow(new IllegalArgumentException(errorMessage));

        // act & assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userController.updateUser(userId, userRequest)
        );

        assertEquals(errorMessage, exception.getMessage());
        verify(userService, times(1)).updateUser(userId, userRequest);
    }

    @Test
    @DisplayName("Should return success message when deleteUser is called with valid ID")
    void deleteUser_ValidId_ReturnsSuccessMessage() {
        // arrange
        String successMessage = "User deleted successfully.";
        when(userService.deleteUser(userId)).thenReturn(successMessage);

        // act
        String result = userController.deleteUser(userId);

        // assert
        assertEquals(successMessage, result);
        verify(userService, times(1)).deleteUser(userId);
    }
}
