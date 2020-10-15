import Repository from "./auth.repository"
import { saltRounds } from "../../constants/secret"
import bcrypt from "bcrypt";
import TokenService from "../../service/jwt";
import slugTransfer from "speakingurl";

import LogicError from "../../errors/Logic.error"

class AuthService {
    constructor() {
        this.repository = Repository;
    }

    async signup(payload) {
        const { email, username, password } = payload;
        payload.username = payload.username.toUpperCase();
        payload.password = bcrypt.hashSync(password, saltRounds);
        payload.slug = slugTransfer(`${username}-${Date.now()}`);
        payload.avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
        const user = await this.repository.getOne({ email: email });
    
        if(user != null) {
            throw new LogicError("Your account is exist");
        }

        const returnedData = await this.repository.createOne(payload);
        const signPayload = {
            id: returnedData._id,
            slug: returnedData.slug,
        };
        const signToken = TokenService.sign(signPayload);
        const userInfo = {
            username: returnedData.username,
            email: returnedData.email,
            _id: returnedData._id,
            slug: returnedData.slug,
            avatar: returnedData.avatar,
        }
        const responseData = {
            token: signToken,
            userInfo
        }

        return responseData;
    }

    async signin(payload) {
        const { email, password } = payload;
        const user = await this.repository.getOne({ email: email });
        if(!user) {
            throw new LogicError("Your account is not exist");
        }
        if(!bcrypt.compareSync(password, user.password)) {
            throw new LogicError("Your password is not valid");
        }
        const userInfo = {
            username: user.username,
            email: user.email,
            _id: user._id,
            slug: user.slug,
            avatar: user.avatar
        };

        const signPayload = {
            id: user.id,
            slug: user.slug,
        };
        const signToken = TokenService.sign(signPayload);
        const responseData = {
            token: signToken,
            userInfo
        };

        return responseData;
    }
}

export default new AuthService();