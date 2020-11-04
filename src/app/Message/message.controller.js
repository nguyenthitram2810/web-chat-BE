import httpStatus from "http-status";
import MessageService from "./message.service";
import BaseController from "../../infrastructure/Controller";

class MessageController extends BaseController {
    constructor() {
        super();
        this.service = MessageService;
    }

    async sendMessage(request, response) {
        try {
            const { body } = request
            const { userId } = this.getCredentialInfo(request);
            const responseData = await this.service.sendMessage(body, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Send message success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }
}
export default new MessageController();