import Repository from "./auth.repository"

class AuthService {
    static service

    constructor() {
        this.repository = Repository.getRepository()
    }

    static getService() {
        if(!this.service) {
            this.service = new this()
        }
        return this.service
    }

    register() {
        return this.repository.register()
    }
}

export default AuthService