import MessageRepository from "./message.repository"
import ConversationService from "../Conversation/conversation.service"
import ConversationRepository from "../Conversation/conversation.repository"

class MessageService {
    constructor() {
        this.repository = MessageRepository;
        this.conversationService = ConversationService.getService()
        this.conversationRepository = ConversationRepository
    }

    async sendMessage(payload, userId) {
        const { content, conversationID, userIds } = payload
        payload.memberId = userId
        const newMessage = await this.repository.createOne(payload)
        const returnMessage = await newMessage.populate('memberId', 'username avatar slug _id').execPopulate()
        console.log(returnMessage.memberId[0]);
        const rawConversation = await this.conversationRepository.findOneAndUpdate({_id: conversationID}, { lastMessage: content, lastUser: userId}, { new: true })
        const conversation = await rawConversation.populate('userIds', 'username email slug avatar _id').populate('lastUser', 'username avatar slug _id').execPopulate()
        this.conversationService.emitSocketNewMessage(userId, returnMessage, userIds, conversation);
        const responseData = {
            returnMessage,
            conversation,
        }
        return responseData;
    }
}

export default new MessageService();