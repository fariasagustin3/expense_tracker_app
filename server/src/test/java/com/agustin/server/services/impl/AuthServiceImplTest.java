package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.LoginRequest;
import com.agustin.server.dtos.requests.RegisterRequest;
import com.agustin.server.dtos.responses.AuthResponse;
import com.agustin.server.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtServiceImpl jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthServiceImpl authService;

    private User testUser;
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        // prepare test data
        registerRequest = new RegisterRequest();
        registerRequest.setFirstName("Agustin");
        registerRequest.setLastName("Farias");
        registerRequest.setEmail("agus@mail.com");
        registerRequest.setPassword("1234");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("agus@mail.com");
        loginRequest.setPassword("1234");

        testUser = new User().builder()
                .firstName("Agustin")
                .lastName("Farias")
                .email("agus@mail.com")
                .password("encoded_password")
                .build();
    }

    // REGISTER
    @Test
    @DisplayName("Should register a new user successfully")
    void shouldRegisterUserSuccessfully() {
        // given
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtService.getToken(any(User.class))).thenReturn("jwt.token.test");

        // when
        AuthResponse response = authService.register(registerRequest);

        // then
        assertNotNull(response);
        assertEquals("jwt.token.test", response.getToken());
        verify(userRepository).save(any(User.class));
        verify(jwtService).getToken(any(User.class));
    }

    @Test
    @DisplayName("Should throw exception when user with email already exists")
    void shouldThrowExceptionWhenEmailAlreadyExists() {
        // given
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));

        // when & then
        assertThrows(IllegalArgumentException.class, () -> {
            authService.register(registerRequest);
        });

        verify(userRepository, never()).save(any(User.class));
    }

    //LOGIN
    @Test
    @DisplayName("Should authenticate and return token on successfull login")
    void shouldLoginSuccessfully() {
        // given
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(jwtService.getToken(any(User.class))).thenReturn("jwt.token.test");

        // when
        AuthResponse response = authService.login(loginRequest);

        // then
        assertNotNull(response);
        assertEquals("jwt.token.test", response.getToken());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService).getToken(testUser);
    }

    @Test
    @DisplayName("Should throw exception when authentication falis")
    void shouldThrowExceptionWhenAuthenticationFails() {
        // given
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Bad credentials"));

        // when & then
        assertThrows(BadCredentialsException.class, () -> {
            authService.login(loginRequest);
        });

        verify(jwtService, never()).getToken(any());
    }

    @Test
    @DisplayName("Should throw exception when user not found")
    void shouldThrowExceptionWhenUserNotFound() {
        // Given
        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> {
            authService.login(loginRequest);
        });
    }

}
