import React from 'react';
import { Box, Grid } from '../../../../node_modules/@mui/material/index';

export const ElementsStorage = ({ elements }) => {

    const convertElement = (str) => {
        if (str === "fire") {
            return "огненный свет";
        } else if (str === "water") {
            return "родниковая вода";
        } else if (str === "herb1") {
            return "цветок папоротника";
        } else if (str === "bat") {
            return "крыло летучей мыши";
        } else if (str === "herb2") {
            return "беладонна";
        }
    }

    return (
        <>
            <Box sx={{
                width: "790px",
                height: "467px",
                left: "357px",
                top: "283px",

                background: "rgba(83, 46, 0, 0.6)",
                borderRadius: "20px",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center",
            }}>
                <Grid container
                    spacing={{ xs: 2, md: 3 }}
                    style={{ maxHeight: '355px', }}
                    sx={{}}
                    direction="column"
                >
                    {elements.map((item, i) =>
                        <Grid item key={i} >
                            {convertElement(item)}
                        </Grid>
                    )}
                </Grid>
            </Box>
        </>
    )
};