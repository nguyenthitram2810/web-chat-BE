import { Models } from "../../database/models/index"
import BaseRepository from "../../infrastructure/Repository"

class AuthRepository extends BaseRepository  {
    constructor() {
        const { User } = Models;
        super(User);
    }
}

export default new AuthRepository();