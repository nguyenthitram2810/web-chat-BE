import ConversationController from "./conversation.controller";
import ConversationValidator from "./conversation.validator";
import AuthenService from "../../middlewares/Authentication";

class ConversationHandler {
    constructor() {
        this.controller = ConversationController;
        this.validator = ConversationValidator;
        this.authen = AuthenService
    }

    createConversation() {
        return [
            this.authen.call("verify"),
            this.controller.call("createConversation")
        ];
    }

    listConversations() {
        return [
            this.authen.call("verify"),
            this.controller.call("listConversations")
        ];
    }

    checkExistConversation() {
        return [
            this.authen.call("verify"),
            this.controller.call("checkExistConversation")
        ];
    }
}
export default new ConversationHandler();