import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AuthPage() {


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
            axios.post('http://localhost:5000/auth/login', {
                username: email,
                password: password
            },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                .then(function (response) {
                    const userObj = { token: response.data.accessToken, username: response.data.username };
                    const userStr = JSON.stringify(userObj);
                    console.log(userObj);
                    console.log(userStr);
                    sessionStorage.setItem('user', userStr);
                })
                .catch(function (error) {
                    console.log(error);
                });

            // let response = userLogin(email, password);
            // response.then((result) => {
            //     if (result === "wrong-input") {
            //         setSignError("Неверный логин и/или пароль")
            //     }
            // })
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
                    Вход в систему
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
                        Войти
                    </Button>
                    <Link to="/register">Зарегистрироваться</Link>
                </Box>
            </Box>
        </Container>

    );
}
