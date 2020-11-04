import socket from 'socket.io';
import ConversationService from "../app/Conversation/conversation.service"

export default function (server) {
    const io = socket(server)

    ConversationService.io = io.of('/Conversation').on('connection', (client) => {
        client.on('join', (data) => {
            console.log(`Da join room ${data}`);
            client.join(data);
        });
    });

    ConversationService.notifyIO= io.of('/notifyIO').on('connection', (client) => {
        client.on('join', (data) => {
            console.log(`User da join ${data}`);
            client.join(data);
        });
    });

}
