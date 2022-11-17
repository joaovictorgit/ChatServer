import { io } from "./http";
import { Message } from "./interfaces/Message";
import { User } from "./interfaces/User";

const users: User[] = [];
const messages: Message[] = [];

io.on('connection', socket => {
    socket.on('select_room', data => {
        socket.join(data.room);

        const userInRoom = users.find(user => user.username === data.username && user.room === data.room);

        if (userInRoom) {
            userInRoom.id = socket.id;
        } else {
            users.push({
                room: data.room,
                username: data.username,
                id: socket.id,
            });
        }
    });

    socket.emit('select-users', users);

    socket.on("message", data => {
        //console.log(data);
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date()
        }

        messages.push(message);
        io.to(data.room).emit('message', message);
    });
});

