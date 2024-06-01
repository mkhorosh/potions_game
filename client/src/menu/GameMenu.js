import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton } from "../common/StyledButton";
import { useState } from "react";
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const GameMenu = () => {

    const [state, setState] = useState({
        twopl: true,
        treepl: false,
        fourpl: false,
        withComputer: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let navigate = useNavigate();
    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1" sx={{ fontSize: "36px", color: "#C3DFB1", mb: 4 }}>С кем будете играть?</Typography>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel >Количество игроков</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.twopl} onChange={handleChange} name="twopl" />
                        }
                        label="2 игрока"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.treepl} onChange={handleChange} name="treepl" />
                        }
                        label="3 игрока"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.fourpl} onChange={handleChange} name="fourpl" />
                        }
                        label="4 игрока"
                    />
                </FormGroup>
                <FormHelperText>Отметьте все варианты</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel >Соперники</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.withComputer} onChange={handleChange} name="withComputer" />
                        }
                        label="Игра с компьютером"
                    />
                </FormGroup>
                {/* <FormHelperText>Отметьте все варианты</FormHelperText> */}
            </FormControl>
            <Link to={`/rooms-list`}><StyledButton variant="contained" sx={{ backgroundColor: "#FDEE71" }}>Начать игру</StyledButton></Link>
            {/* <Divider sx={{ color: "#C3DFB1", }} component="div" /> */}
            <Box sx={{
                width: "60%", 
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'start'
            }}>
                <Typography component={'div'}>
                Присоединяйтесь к игре, в которой вас ждут, или создайте игру, чтобы к ней присоединились ваши друзья.
                </Typography>
                <StyledButton variant="outlined" sx={{ mt: "20px", border: '3px solid #FDEE71', color:"#FDEE71" }} onClick={()=>navigate(`/friendly-game`)}>Игра с друзьями</StyledButton>
            </Box>
            
        </Box >
    );
}