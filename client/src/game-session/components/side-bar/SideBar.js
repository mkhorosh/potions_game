import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';

export const SideBar = () => {


    const handleClick = () => {

    }

    return (
        <div className="side-bar">
            <IconButton onClick={handleClick}
                style={{ padding: 1 }}
            >
                <SettingsIcon style={{
                    color: "black",
                    fontSize: "24px",
                }} />
            </IconButton>

        </div>
    )
};