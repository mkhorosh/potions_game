import React from 'react';
import { Card, CardContent, Typography, Checkbox, Toolbar, Box, Chip, IconButton, Badge } from '../../../../node_modules/@mui/material/index';

export const PlayerBadget = () => {

    return (
        <>
            
            <Box sx={{
                width: "293px",
                height: "68px",
                backgroundColor: "#FEF9E6",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center",
            }}>
                <span className="dot" > 5 </span>

                <Typography gutterBottom variant="h5" component="div"
                    sx={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                    }}
                >
                    {"player-name"}
                </Typography>

            </Box>
        </>


    )
};