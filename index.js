const authRoute = require('./src/Auth.router');

const app = require("express")();
const server = require("http").createServer(app);

const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const cors = require('cors')

// const path = require('path')
app.use(cors())

if (!process.env.PORT) {
    process.exit(1);
}

const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use("/auth", authRoute);

app.get(
    "/self",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.status(401).end();
        }
    },
);

const jwtDecodeOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    issuer: "accounts.examplesoft.com",
    audience: "yoursite.net",
};

passport.use(
    new JwtStrategy(jwtDecodeOptions, (payload, done) => {
        return done(null, payload.data);
    }),
);


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { authRouter } = require("./src/Auth.router");
const io = require('socket.io')(server,
    {
        cors: {
            origin: "http://localhost:3000",
            // methods: ["GET", "POST"],
            // allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    }
);

io.engine.use((req, res, next) => {
    // console.log(req._query);
    const isHandshake = (req._query.sid === undefined);
    if (isHandshake) {
        console.log("yes");
        passport.authenticate("jwt", { session: false })(req, res, next);
    } else {
        console.log("не надо");
        next();
    }
});

io.on('connection', socket => {
    socket.on('join', (payload, callback) => {
        console.log(payload);
        let numberOfUsersInRoom = getUsersInRoom(payload.room).length

        const { error, newUser } = addUser({
            id: socket.id,
            name: payload.username,
            room: payload.room
        })

        if (error)
            return callback(error)

        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', { room: newUser.room, users: getUsersInRoom(newUser.room) })
        socket.emit('currentUserData', { name: newUser.name })
        callback()
    })

    socket.on('initGameState', gameState => {
        const user = getUser(socket.id)
        console.log("server");
        console.log(user);
        console.log(gameState);
        if (user)
            io.to(user.room).emit('initGameState', gameState)
    })

    socket.on('updateGameState', gameState => {
        const user = getUser(socket.id)
        if (user)
            io.to(user.room).emit('updateGameState', gameState)
    })

    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: payload.message })
        callback()
    })

    socket.on('disconnected', () => {
        const user = removeUser(socket.id)
        if (user)
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    })
})

// //serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})