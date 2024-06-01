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

const { createRoom, getRoom, getUsersInRoom, addUser2Room, isRoomFull, startGame, getRoomState,
    drawCard, isGameOver, isGameStarted, getWinner, playElement, playRecipe } = require('./src/rooms');

const { authRouter } = require("./src/Auth.router");
var io;
var getIOInstance = function () {
    return io;
};
//TODO var is dangerous
io = require('socket.io')(server,
    {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    }
);

io.engine.use((req, res, next) => {
    const isHandshake = (req._query.sid === undefined);
    if (isHandshake) {
        passport.authenticate("jwt", { session: false })(req, res, next);
    } else {
        next();
    }
});

io.on('connection', socket => {

    socket.on('join', (payload, callback) => {
        const roomId = payload.room;
        const gameOptions = payload.options;
        const gamePrivacy = payload.privacy;
        if (roomId.length !== 5) {
            return callback("invalid code");
        }
        if (!getRoom(roomId)) {
            createRoom(roomId, gameOptions, gamePrivacy);
        }
        if (!isRoomFull(roomId)) {
            addUser2Room(roomId, payload.username);
            socket.join(roomId);
            io.to(roomId).emit('usersInRoom', getUsersInRoom(roomId));
        }

        if (isRoomFull(roomId) && isGameStarted(roomId)) {
            return callback("room is full");
        } else if (isRoomFull(roomId)) {
            startGame(roomId, getIOInstance);
            io.to(roomId).emit('updateGameState', getRoomState(roomId));
        }
        callback();
    });

    socket.on('drawCard', payload => {
        drawCard(payload.room, payload.username, getIOInstance);
        io.to(payload.room).emit('updateGameState', getRoomState(payload.room));
        if (isGameOver(payload.room)) {
            io.to(payload.room).emit('gameOver', getWinner(payload.room));
            //TODO statistics
        }
    })

    socket.on('playElement', payload => {
        playElement(payload.room, payload.username, payload.card, getIOInstance);
        io.to(payload.room).emit('updateGameState', getRoomState(payload.room));
    })

    socket.on('playRecipe', payload => {
        playRecipe(payload.room, payload.username, payload.card, getIOInstance);
        io.to(payload.room).emit('updateGameState', getRoomState(payload.room));
    })

    socket.on('sendMessage', (payload, callback) => {
        io.to(payload.room).emit('message', { user: payload.username, text: payload.message })
        callback()
    })

    socket.on('disconnected', () => {
        // const user = removeUser(socket.id);
        const user = null;
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