import { Models } from "../../database/models/index"
import BaseRepository from "../../infrastructure/Repository"

class UserRepository extends BaseRepository  {
    constructor() {
        const { User } = Models;
        super(User);
    }

    getUserLimit(searchText, userId) {
        return Models.User.find({
            username: {$regex: `.*${searchText}*.`},
            _id: { $ne: userId }
        }).limit(5)
    }
}

export default new UserRepository();