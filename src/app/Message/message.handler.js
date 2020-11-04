import MessageController from "./message.controller";
import MessageValidator from "./message.validator";
import AuthenService from "../../middlewares/Authentication";

class MessageHandler {
    constructor() {
        this.controller = MessageController;
        this.validator = MessageValidator;
        this.authen = AuthenService
    }

    sendMessage() {
        return [
            this.authen.call("verify"),
            this.controller.call("sendMessage")
        ];
    }
}
export default new MessageHandler();