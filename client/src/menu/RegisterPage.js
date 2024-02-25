import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegisterPage() {


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signError, setSignError] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setSignError("");
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        if (email === '') {
            setEmailError("Введите логин");
        }
        if (password === '') {
            setPasswordError("Введите пароль");
        }
        if (email && password) {
            console.log({ email, password })
            axios.post('http://localhost:5000/auth/register', {
                username: email,
                password: password
            },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                .then(function (response) {
                    console.log(response);
                    console.log(response.data.token);
                   

                })
                .catch(function (error) {
                    console.log(error);
                });

            
        }
    };


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: "60px" }}>
                    Регистрация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                    mt: 1, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Логин"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!emailError}
                        helperText={emailError ? emailError : ''}
                        sx={{
                            width: "530px",
                            height: "48px",
                            input: {
                                background: "#E6E6E6"
                            },
                            fieldset: {
                                borderRadius: "12px",
                            },
                            "& fieldset": { border: 'none' },
                            mb: "30px"
                        }}
                    />
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!passwordError}
                        helperText={passwordError ? passwordError : ''}
                        sx={{
                            width: "530px",
                            height: "48px",
                            input: {
                                background: "#E6E6E6"
                            },
                            fieldset: {
                                borderRadius: "12px",
                            },
                            "& fieldset": { border: 'none' },
                            mt: "10px",
                            mb: "30px"
                        }}
                    />

                    <Typography variant="subtitle1" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        {signError && "Неверный логин и/или пароль"}
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: "100px",
                            width: "139px",
                            height: "49px"
                        }}
                    >
                        Зарегистрироваться
                    </Button>
                    <Link to="/login">Войти</Link>
                </Box>
            </Box>
        </Container>

    );
}
