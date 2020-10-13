import httpStatus from "http-status";
import UserService from "./user.service";
import BaseController from "../../infrastructure/Controller";

class UserController extends BaseController {
    constructor() {
        super();
        this.service = UserService;
    }

    async searchFriend(request, response) {
        try {
            const payload = request.body;
            const { userId } = this.getCredentialInfo(request);
            const responseData = await this.service.searchFriend(payload, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Search success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }
}
export default new UserController();