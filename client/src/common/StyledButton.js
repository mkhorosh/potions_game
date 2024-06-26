import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledButton = styled(Button)(({
    fontSize: "18px",
    color: "#7B6A5A",
    textTransform: "uppercase",
    fontWeight: "700",
    borderRadius: "12px",
    height: "57px",
    '&:hover': {
        backgroundColor: '#EDAC5B',
        color: '#FDEE71',
    },
}));