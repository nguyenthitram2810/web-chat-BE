import { Models } from "../../database/models/index"
import BaseRepository from "../../infrastructure/Repository"

class ConversationRepository extends BaseRepository  {
    constructor() {
        const { Conversation } = Models;
        super(Conversation);
    }

    getListConversations(userId) {
        return Models.Conversation.find({ userIds: { $elemMatch: { $eq: userId } } })
        .select('groupName lastMessage lastUser avatar _id updatedAt createdAt')
        .populate('userIds', 'username email slug avatar _id')
        .populate('lastUser', 'username avatar slug _id')
        .sort({ updatedAt: -1 });
    }

    getOneConversation(roomId) {
        return Models.Conversation.findOne({ _id: {$eq: roomId }})
        .select('groupName lastMessage lastUser avatar _id updatedAt createdAt')
        .populate('userIds', 'username email slug avatar _id')
    }

    checkExistConversation(userIds) {
        return Models.Conversation.findOne({ userIds: {$eq: userIds }})
        .select('groupName lastMessage lastUser avatar _id updatedAt createdAt')
    }
}

export default new ConversationRepository();