import UserRepository from "./user.repository"
import { saltRounds } from "../../constants/secret"
import bcrypt from "bcrypt";
import TokenService from "../../service/jwt";
import slugTransfer from "speakingurl";

import LogicError from "../../errors/Logic.error"

class UserService {
    constructor() {
        this.repository = UserRepository;
    }

    async searchFriend(payload, userId) {
        const { searchText } = payload;
        const listUser = await this.repository.getUserLimit(searchText, userId);
        const responseData = {
            listUser
        }
        return responseData;
    }
}

export default new UserService();