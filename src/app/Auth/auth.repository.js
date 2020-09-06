import model from "../../database/models/index"

class AuthRepository {
    static repository 
    
    static getRepository() {
        if(!this.repository) {
            this.repository = new this()
        }
        return this.repository
    }

    register() {
        const data = "OK"
        return data
    }
}

export default AuthRepository