import UserController from "./user.controller";
import UserValidator from "./user.validator";
import AuthenService from "../../middlewares/Authentication";

class UserHandler {
    constructor() {
        this.controller = UserController;
        this.validator = UserValidator;
        this.authen = AuthenService
    }

    searchFriend() {
        return [
            this.authen.call("verify"),
            this.controller.call("searchFriend")
        ];
    }
}
export default new UserHandler();