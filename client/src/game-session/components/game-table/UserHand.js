import React, { Component } from 'react';
// import { Baraja } from 'react-baraja-js';
// import { ReactComponent as ReactLogo } from './card2.svg';
import { ReactSVG } from "react-svg";
import { ReactComponent as Logo } from "../../../asserts/card2.svg";


const cards = [
    {
        imageSrc: '..\asserts\card2.png',
        title: 'card 1',
        details: 'this is card 1'
    },
    {
        imageSrc: 'client/src/asserts/card3.png',
        title: 'card 2',
        details: 'this is card 2'
    }
];

// const logo = require("../../../asserts/card2.svg"); // with require
// const logo2 = require('../asserts/card2.svg'); // with require

export const UserHand = () => {
    return (
        <div>
            {/* {cards.map((item) => {
                    <img src={item.imageSrc} alt="card"></img>
                })} */}
            < img src={"logo2"} alt="card" ></ img>
            {/* <ReactLogo /> */}
            <Logo />
            {/* <ReactSVG src={logo} /> */}
        </div >
    );
}
export default UserHand;