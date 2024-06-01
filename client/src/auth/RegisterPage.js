import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppBar, Button, Snackbar, Toolbar, Tooltip } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledButton } from '../common/StyledButton';

export default function RegisterPage() {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signError, setSignError] = useState("");
    const [isSnackOpen, setSnackOpen] = useState(false);

    const navigate = useNavigate();

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
                    setSnackOpen(true);
                    setTimeout(() => setSnackOpen(false), 15000);
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
    };


    return (
        <>
            <AppBar
                sx={{ background: 'transparent', boxShadow: 'none' }}
                elevation={0}
                position="sticky"
            >
                <Toolbar disableGutters>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row", flexGrow: 1
                    }}>
                        <Tooltip>
                            <Button
                                onClick={() => navigate(`/login`)}
                                sx={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontSize: "18px"
                                }}
                            >

                                <ArrowBackIcon sx={{ marginLeft: "5px" }} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
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
                    <Typography component="h1" variant="h5" sx={{
                        mr: 2,
                        mt: 2,
                        // display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Pacifico',
                        fontWeight: "700",
                        fontSize: "32px",
                        color: '#c3dfb1',
                        textDecoration: 'none', }}>
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                        mt: 6, display: 'flex',
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
                                height: "54px",
                                bgcolor: "#E6E6E6",
                                borderRadius: "12px",
                                "& fieldset": { borderRadius: "12px", },
                                mb: "30px",
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
                                height: "54px",
                                bgcolor: "#E6E6E6",
                                borderRadius: "12px",
                                "& fieldset": { borderRadius: "12px", },
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
                        <StyledButton type="submit" variant="contained" sx={{
                            mt: "50px",
                            mb: 1,
                            // width: "139px",
                            height: "49px",
                            backgroundColor: "#FDEE71"
                        }} >зарегистрироваться</StyledButton>
                        <Link to="/login">Войти</Link>
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={isSnackOpen}
                message="Registration complete"
            />
        </>
    );
}
