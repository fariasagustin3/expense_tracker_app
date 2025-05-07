package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.RegisterRequest;
import com.agustin.server.dtos.responses.AuthResponse;
import com.agustin.server.repositories.UserRepository;
import com.agustin.server.services.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthServiceImpl authService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Test
    void shouldRegisterUserSuccessfully() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setFirstName("Agustin");
        request.setLastName("Farias");
        request.setEmail("agus@gmail.com");
        request.setPassword("1234");

        String encodedPassword = "encodedPassword123";
        String fakeToken = "fake-jwt-token";

        when(passwordEncoder.encode("1234")).thenReturn(encodedPassword);
        when(jwtService.getToken(any(User.class))).thenReturn(fakeToken);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        AuthResponse response = authService.register(request);

        // Assert
        assertNotNull(response);
        assertEquals(fakeToken, response.getToken());

        // Verify interactions
        verify(passwordEncoder).encode("1234");
        verify(jwtService).getToken(any(User.class));
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals("Agustin", savedUser.getFirstName());
        assertEquals("Farias", savedUser.getLastName());
        assertEquals("agus@gmail.com", savedUser.getEmail());
        assertEquals(encodedPassword, savedUser.getPassword());
    }
}
