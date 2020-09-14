import AuthController from "./auth.controller";
import AuthValidator from "./auth.validator";

class AuthHandler {
    constructor() {
        this.controller = AuthController;
        this.validator = AuthValidator;
    }

    signup() {
        return [
            this.validator.checkSignUpData(),
            this.controller.call("signup")
        ];
    }

    signin() {
        return [
            this.validator.checkSignInData(),
            this.controller.call("signin")
        ];
    }
}
export default new AuthHandler();