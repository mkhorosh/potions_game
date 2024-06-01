import React from 'react';
import { Box, Grid } from '../../../../node_modules/@mui/material/index';

export const ChatBox = ({ messages, message, setMessage, sendMessage }) => {

    return (
        <>
            <Box sx={{
                width: "293px",
                height: "460px",
                backgroundColor: "#FEF9E6",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: "center",
            }}>
                <Grid container
                    rowSpacing={2} direction="column" wrap="nowrap"
                    order="revert"
                    style={{
                        height: '515px',
                    }}
                >
                    {messages.map((msg => {
                        return <p key={msg.id}>{msg.text}</p>
                    }))}
                </Grid>
                <div className="chat-text">
                    <input type='text' placeholder='Наберите сообщение...' value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' && sendMessage(event)} />
                </div>

            </Box>
        </>
    )
};