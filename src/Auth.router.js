const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('src/users.json');
const db = low(adapter);

const defaultUsers = [{
    "id": 3,
    "password": "$2a$12$7eICx14GZGZWoLJwDKdbEug5Z45GostBuXPkz/g4o1LuR1/aJMo4i",
    "username": "123"
}];

authRouter.post("/login", async (req, res) => {
    try {
        console.log(db.get("users").value());
        const { username, password } = req.body;
        let user_data = db.get("users").value().find(obj => obj.username === username);
        if (!user_data) {
            res.status(500).send("Неверный логин или пароль");
            return;
        }
        const isCorrectPassword = await bcrypt.compare(password, user_data.password);
        if (!isCorrectPassword) {
            res.status(500).send("Неверный логин или пароль");
            return;
        }
        console.log("authentication OK");

        const user = {
            username: username,
        };

        const accessToken = jwt.sign(
            {
                data: user,
            },
            process.env.JWT_SECRET,
            {
                issuer: "accounts.examplesoft.com",
                audience: "yoursite.net",
                expiresIn: "1h",
            },
        );

        res.json({ username: username, accessToken: accessToken });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Что-то пошло не так. Попробуйте снова" });
    }
})

authRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        let user_data = db.get("users").value().find(obj => obj.name === username);
        if (user_data) {
            res.status(500).send("Логин занят");
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        db.get("users")
            .push({
                password: hashedPassword,
                username: username,
                id: "1px"
            })
            .write();
        res.send("пользователь создан");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

})

authRouter.post('/logout', (req, res) => {
    req.logout((err) => {
        console.log(err);
    })
})


module.exports = authRouter