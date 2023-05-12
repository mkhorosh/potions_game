import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import React from 'react';

export const RulesModal = ({ isOpen, onClose }) => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            // TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >

            <DialogContent sx={{ backgroundColor: "#FEF9E6", }}><DialogTitle id="alert-dialog-title">
                <Typography sx={{
                    // fontSize: "24px",
                    // lineHeight: "33px"
                }}>Правила игры</Typography>
            </DialogTitle>
                <DialogContentText id="alert-dialog-description">
                    <Box component="" sx={{
                        mt: 3, display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        Самая популярная карточная игра в России. Благодаря простым правилам в неё любят играть и взрослые, и дети.
                        Первым ходом кидайте любую карту.
                        Кроющийся должен покрыть каждую подкинутую под него карту картой той же масти, но большего достоинства, или любым козырем. Козырную карту можно покрыть только козырем большего достоинства.
                        Козырная масть определяется картой под колодой.
                        Подкидывать можно карты того же достоинства, что и карты лежащие на столе.
                        Если кроющийся всё покрыл, а подкидывать больше нечего (или не хочется), жмите «Бито».
                        Если вам нечем крыться (или не хочется), жмите «Беру».
                        Подкидывать можно не больше 6 карт, или не больше, чем есть карт у кроющегося.
                        Если кроющийся отбился, то следующий первый ход за ним. Если же взял, то будет ходить следующий по часовой стрелке игрок.
                        Проигрывает игрок, последним оставшийся с картами на руках.
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
};
