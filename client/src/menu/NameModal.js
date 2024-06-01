import { Box, Dialog, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';
import { StyledButton } from '../common/StyledButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const NameModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [guestName, setGuestName] = useState("");

    const logIn = () => {
        let path = `/login`;
        navigate(path);
    }

    const handleSignGuest = (name) => {
        axios.post('http://localhost:5000/auth/guest', {
            username: name
        },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            .then(function (response) {
                const userObj = { token: response.data.accessToken, username: response.data.username };
                const userStr = JSON.stringify(userObj);
                sessionStorage.setItem('user', userStr);
                let path = `/menu`;
                navigate(path);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent sx={{ backgroundColor: "#FEF9E6", }}>
                <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', textAlign: "center", }}>
                    <Typography sx={{
                        textAlign: "center",
                    }}>Представьтесь</Typography>
                </DialogTitle>

                <Box component="" sx={{
                    mt: 0, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box component="form"
                        noValidate sx={{
                            mt: 1, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <TextField
                            variant='outlined'
                            margin="normal"
                            required
                            fullWidth
                            id="text"
                            label="Имя"
                            name="username"
                            sx={{
                                // background: "#E6E6E6",
                                borderRadius: "12px",
                                width: "326px",
                                "& fieldset": { borderRadius: "12px" },
                            }}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                    </Box>
                    <StyledButton variant="contained" sx={{
                        mb: 1, width: "250px",
                        height: "57px",
                        backgroundColor: "#FDEE71"
                    }}
                        onClick={() => { handleSignGuest(guestName) }}
                    // disabled
                    >Играть</StyledButton>
                    <Typography sx={{

                    }}>или</Typography>
                    <StyledButton variant="contained" sx={{
                        mb: 1, width: "250px",
                        height: "57px",
                        backgroundColor: "#FDEE71"
                    }}
                        onClick={logIn}
                    >войти</StyledButton>
                </Box>

            </DialogContent>
        </Dialog>
    )
};
