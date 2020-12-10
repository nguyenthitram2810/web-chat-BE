import socket from 'socket.io';
import ConversationService from "../app/Conversation/conversation.service"

//object: moi attribute la 1 room
const users = {};

const socketToRoom = {};

export default function (server) {
    const io = socket(server)

    ConversationService.io = io.of('/Conversation').on('connection', (client) => {
        client.on('join', (id) => {
            console.log(`Da join room ${id}`);
            client.join(id);
        });

        client.on('left', (data) => {
            console.log(`Da left room ${data}`);
            client.leave(data);
        });

        client.on('join call', (roomID) => {
            console.log(roomID);
            if (users[roomID]) {
                const length = users[roomID].length;
                if (length === 4) {
                    client.emit("room full");
                    return;
                }
                users[roomID].forEach(e => {
                    if(e != client.id) {
                        users[roomID].push(client.id);
                    }
                });
            } else {
                users[roomID] = [client.id];
            }
            socketToRoom[client.id] = roomID;
            const usersInThisRoom = users[roomID].filter(id => id !== client.id);
            //gui toi ng tham gia cuoc goi socketid cua tat ca user trong room
            console.log(usersInThisRoom);
            client.emit("all users", usersInThisRoom);
        })

        //nguoi tham gia cuoc goi gui signal cua minh den cac user in room
        client.on("sending signal", payload => {
            ConversationService.io.to(payload.socketID).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });

        client.on("returning signal", payload => {
            ConversationService.io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: client.id });
        });

        client.on("disconnect-call", payload => {
            let roomID = socketToRoom[client.id]
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== client.id);
                users[roomID] = room;
            }
            ConversationService.io.to(payload.callerID).emit('user-disconnect', { signal: payload.signal, id: client.id });
        });
    });

    ConversationService.notifyIO= io.of('/notifyIO').on('connection', (client) => {
        client.on('join', (data) => {
            console.log(`User da join ${data}`);
            client.join(data);
        });

        client.on('notify call', (data) => {
            console.log(data);
            console.log(data.list.userIds);
            data.list.userIds.forEach(e => {
                if(e._id != data.user._id) {
                    ConversationService.notifyIO.to(e._id).emit('new call', {
                        userCall: data.user, 
                        roomID: data.list._id
                    });
                }
            })
        });
    });

}
