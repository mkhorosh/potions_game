import React from 'react';
import { Card, CardContent, Typography, Checkbox, Toolbar, Box, Chip, IconButton, Badge } from '../../../../node_modules/@mui/material/index';

export const PlayerBadget = ({label, points}) => {

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
                    <span className="dot" > {points} </span>

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