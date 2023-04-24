const rooms = []

const addRoom = ({ id, name, users }) => {
    const numberOfUsersInRoom = rooms.filter(room => room.users === users).length
    if (numberOfUsersInRoom === 2)
        return { error: 'Room full' }

    const newRoom = { id, name, users }
    rooms.push(newRoom)
    return { newRoom }
}

const removeRoom = id => {
    const removeIndex = rooms.findIndex(room => room.id === id)

    if (removeIndex !== -1)
        return rooms.splice(removeIndex, 1)[0]
}

const getRoom = id => {
    return rooms.find(room => room.id === id)
}

const getUsersInRoom = room => {
    return rooms.filter(room => room.users === room)
}

module.exports = { addRoom, removeRoom, getRoom, getUsersInRoom }