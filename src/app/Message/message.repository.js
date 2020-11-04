import { Models } from "../../database/models/index"
import BaseRepository from "../../infrastructure/Repository"

class MessageRepository extends BaseRepository  {
    constructor() {
        const { Message } = Models;
        super(Message);
    }

    getListMessage(roomId) {
        return Models.Message
        .find({ conversationID: roomId })
        .select('content memberId _id conversationID createdAt updatedAt')
        .populate('conversationID', 'userIds')
        .populate('memberId', 'username avatar slug _id');
    }

    getMessage(userId) {
        return Models.Message
        .find({ memberId: userId})
        .populate('memberId', 'username avatar slug _id')
    }

    sendMessage(payload) {
        return Models.Message.create(payload).populate('memberId', 'username avatar slug _id')
    }
}

export default new MessageRepository();