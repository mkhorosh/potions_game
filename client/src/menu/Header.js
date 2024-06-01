import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Toolbar, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Header({ setUser }) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(JSON.parse(sessionStorage.getItem('user')));
    }, []);

    const logOut = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        window.location.reload(false);
    }

    let navigate = useNavigate();

    const logIn = () => {
        let path = `/login`;
        navigate(path);
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            sx={{
                bgcolor: '#557a4f',
                boxShadow: 2
            }}
            elevation={0}
            position="sticky"
        >
            <Toolbar disableGutters>
                {userData ?
                    <>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row", flexGrow: 1
                        }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    // display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Noto Sans',
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    color: '#c3dfb1',
                                    textDecoration: 'none',
                                }}
                            >
                                Привет, {userData.username}!
                            </Typography>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={logOut}>Выход</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <Button
                                    onClick={logOut}
                                    sx={{
                                        color: "#c3dfb1",
                                        fontWeight: "700",
                                        fontSize: "18px"
                                    }}
                                >
                                    Выход
                                    <LogoutIcon sx={{ marginLeft: "5px" }} />
                                </Button>
                            </Tooltip>
                        </Box>
                    </>
                    :
                    <>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexDirection: "row", flexGrow: 1
                        }}>
                            <Tooltip>
                                <Button
                                    onClick={logIn}
                                    sx={{
                                        color: "#c3dfb1",
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        
                                    }}
                                >
                                    Вход
                                    <LoginIcon sx={{ marginLeft: "5px" }} />
                                </Button>
                            </Tooltip>
                        </Box>
                    </>}
            </Toolbar>
        </AppBar>
    );
}