import ConversationRepository from "./conversation.repository"
import MessageRepository from "../Message/message.repository"

class ConversationService {
    static service;
    static io;
    static notifyIO;

    constructor() {
        this.repository = ConversationRepository;
        this.messageRepository = MessageRepository
    }

    static getService() {
        if (!this.service) {
          this.service = new this();
        }
        return this.service;
    }

    async createConversation(payload, userId) {
        const { userIds } = payload;
        userIds.push(userId);
        console.log(userIds)
        if(userIds.length > 2) {
            payload.avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLq1511U6ljDQs6oL8CBB82-9vZWpcFGAmYw&usqp=CAU"
        }
        const newConversation = await this.repository.createOne(payload);
        console.log(newConversation._id)
        const conversation = await this.repository.getOneConversation(newConversation._id);
        const responseData = {
            conversation
        }
        return responseData;
    }

    async listConversations(userId) {
        const listConversations = await this.repository.getListConversations(userId);
        const responseData = {
            listConversations
        }
        return responseData;
    }

    async checkExistConversation(query, userId) {
        query.userIds.push(userId)
        const conversation = await this.repository.checkExistConversation(query.userIds)
        const responseData = {
            conversation
        }
        return responseData;
    }

    async getConversation(query) {
      console.log(query);
        const conversation = await this.repository.getOneConversation(query.roomId)
        const message = await this.messageRepository.getListMessage(query.roomId)
        const responseData = {
            conversation, 
            message
        }
        return responseData;
    }

    emitSocketNewMessage(userId, returnMessage, userIds, conversation) {
      ConversationService.io.to(conversation._id).emit('new-message-room',
      {
        returnMessage, userId, conversation,
      }); 
      
      userIds.forEach((m) => {
        if (m._id !== userId) {
          ConversationService.notifyIO.to(m._id).emit('notifyMessage',
          {
            returnMessage, userId, conversation,
          });
        }
      });   
    }
}

export default ConversationService;