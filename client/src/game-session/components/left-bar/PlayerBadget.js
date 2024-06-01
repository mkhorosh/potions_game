import React from 'react';
import { Typography, Box } from '../../../../node_modules/@mui/material/index';

export const PlayerBadget = ({ label, points }) => {

    return (
        <>
            <Box sx={{
                width: "293px",
                height: "68px",
                backgroundColor: "#FEF9E6",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "center",
                border: "1px solid #D7BBA5",
                borderRadius: "4px",
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <span className="dot" > {points ? points : 0} </span>
                    <Typography gutterBottom variant="h5" component="div"
                        sx={{
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                        }}
                    >
                        {label}
                    </Typography>
                </Box>
            </Box>
        </>


    )
};