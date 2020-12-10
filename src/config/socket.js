import socket from 'socket.io';
import ConversationService from "../app/Conversation/conversation.service"

//object: moi attribute la 1 room
const users = {};

const socketToRoom = {};

export default function (server) {
    const io = socket(server)

    ConversationService.io = io.of('/Conversation').on('connection', (client) => {
        client.on('join', (id) => {
            client.join(id);
        });

        client.on('left', (data) => {
            client.leave(data);
        });

        client.on('join call', (roomID) => {
            if (!users[roomID] || users[roomID].length == 0) {
                users[roomID] = [client.id];
                
            } else {
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
            }
            socketToRoom[client.id] = roomID;
            const usersInThisRoom = users[roomID].filter(id => id !== client.id);
            //gui toi ng tham gia cuoc goi socketid cua tat ca user trong room
            console.log(users[roomID]);
            client.emit("all users", usersInThisRoom);
        })

        //nguoi tham gia cuoc goi gui signal cua minh den cac user in room
        client.on("sending signal", payload => {
            ConversationService.io.to(payload.socketID).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        });

        client.on("returning signal", payload => {
            ConversationService.io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: client.id });
        });

        client.on('disconnect-call', () => {
            let roomID = socketToRoom[client.id]
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== client.id);
                users[roomID] = room;
                users[roomID].forEach(id => {
                    ConversationService.io.to(id).emit('user-cancel-calling', { id: client.id });
                });
                if(users[roomID].length == 1) {
                    users[roomID] = []
                }
            }
        });

        client.on('disconnect', () => {
            let roomID = socketToRoom[client.id]
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== client.id);
                users[roomID] = room;
                users[roomID].forEach(id => {
                    ConversationService.io.to(id).emit('user-cancel-calling', { id: client.id });
                });
            }
        });
    });

    ConversationService.notifyIO= io.of('/notifyIO').on('connection', (client) => {
        client.on('join', (data) => {
            client.join(data);
        });

        client.on('notify call', (data) => {
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
