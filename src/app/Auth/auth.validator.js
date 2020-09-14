import BaseValidator from "../../infrastructure/Validator";

class AuthValidator extends BaseValidator {
    checkSignUpData() {
        const objectValidator = {
            email: this.isEmail(["body"], "email"),
            username: this.isExist(["body"], "username"),
            password: this.matchLength(["body"], "password", { max: 15, min: 6 }),
        };
        return this.start(objectValidator);
    }

    checkSignInData() {
        const objectValidator = {
            email: this.isEmail(["body"], "email"),
            password: this.matchLength(["body"], "password", { max: 15, min: 6 }),
        };
        return this.start(objectValidator);
    }
}
export default new AuthValidator();