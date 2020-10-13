import ConversationRepository from "./conversation.repository"
import { saltRounds } from "../../constants/secret"
import bcrypt from "bcrypt";
import TokenService from "../../service/jwt";
import slugTransfer from "speakingurl";

import LogicError from "../../errors/Logic.error"
import { request } from "express";

class ConversationService {
    constructor() {
        this.repository = ConversationRepository;
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
}

export default new ConversationService();