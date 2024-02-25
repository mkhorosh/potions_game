import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Toolbar, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';



export default function Header() {
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        console.log("here");
        console.log(JSON.parse(sessionStorage.getItem('user')).username);
        setUserData(JSON.parse(sessionStorage.getItem('user')));
    },[]);

    const logOut = () => {
        // userLogout();
        console.log("logout");
        sessionStorage.removeItem('user');
        // axios.post('http://localhost:5000/auth/logout', {
        //     // username: email,
        //     // password: password
        // },
        //     {
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8",
        //         }
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         // console.log(response.data.token);
        //         // sessionStorage.setItem("token", response.data.token);

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        //TODO socket disconnect
    }

    return (
        <AppBar
            sx={{ bgcolor: 'white' }}
            elevation={0}
            position="sticky"
        >

            <Toolbar disableGutters>

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
                            color: '#0F2D69',
                            textDecoration: 'none',
                        }}
                    >
                        login- {userData? userData.username : "" }
                    </Typography>
                </Box>

                {true && <Box sx={{ flexGrow: 0 }}>
                    <Tooltip>
                        <Button
                            onClick={logOut}
                            sx={{
                                color: "#6C6C6C",
                                fontWeight: "700",
                                fontSize: "18px"
                            }}
                        >
                            Выход
                            <LogoutIcon sx={{ marginLeft: "5px" }} />
                        </Button>
                    </Tooltip>
                </Box>}
            </Toolbar>
        </AppBar>
    );
}