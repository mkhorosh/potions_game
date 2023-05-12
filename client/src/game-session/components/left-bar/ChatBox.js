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
                        
                        // overflowY: 'scroll'
                    }}
                >
                    {messages.map(msg => {
                        if (msg.user === 'Player 1')
                            return <Grid item key={msg.id} sx={{ mr: "5px", }} >
                                <div className="msg-receive">{msg.text}</div>
                            </Grid>
                        if (msg.user === 'Player 2')
                            return <Grid item key={msg.id} sx={{ mr: "5px", }} >
                                <div className="msg-send">{msg.text}</div>
                            </Grid>
                    })}
                    <div className="chat-text">
                        <input type='text' placeholder='Наберите сообщение...' value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' && sendMessage(event)} />
                    </div>
                </Grid>


            </Box>
        </>
    )
};