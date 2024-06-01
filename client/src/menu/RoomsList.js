import { Box, Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StyledButton } from "../common/StyledButton";
import { StyledTable } from "../common/StyledTable";

export const RoomsList = () => {

    let navigate = useNavigate();
    return (
        <Box style={{ backgroundColor: "#557A4F", }}
            sx={{
                width: "100%", height: '100vh',
                display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: 'center'
            }}

        >
            <Typography variant="h1" sx={{ fontSize: "36px", color: "#C3DFB1", mb: 4 }}>Выберите комнату:</Typography>


            <TableContainer component={Paper}>
                <StyledTable sx={{ minWidth: 650, paddingTop: "30%" }} aria-label="simple table" className="styled-table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Комнаты</h3></TableCell>
                            {/* {questions.map((q, index) => (
                                <TableCell key={index} className="question"><h3>{index + 1}</h3></TableCell>
                            ))} */}
                            <TableCell className="question"><h3>id</h3></TableCell>
                            <TableCell className="points"><h3>Места</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow className={""}>
                            <TableCell component="td" scope="row">
                                <p>name</p>
                            </TableCell>

                            <TableCell className="question">
                                431gvu
                            </TableCell>

                            <TableCell className="points"><p>1/3</p></TableCell>
                        </TableRow>

                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Box>
    )
}