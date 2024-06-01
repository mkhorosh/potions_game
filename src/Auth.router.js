const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('src/data/users.json');
const db = low(adapter);

const guestUsers = [];

authRouter.post("/login", async (req, res) => {
    try {
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
                expiresIn: "24h",
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

authRouter.post("/guest", async (req, res) => {
    console.log("iam guest");
    try {
        const { username } = req.body;
        const user = {
            username: username,
        };
        guestUsers.push(user);
        const accessToken = jwt.sign(
            {
                data: user,
            },
            process.env.JWT_SECRET,
            {
                issuer: "accounts.examplesoft.com",
                audience: "yoursite.net",
                expiresIn: "24h",
            },
        );

        res.json({ username: username, accessToken: accessToken });
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