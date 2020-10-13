import httpStatus from "http-status";
import ConversationService from "./conversation.service";
import BaseController from "../../infrastructure/Controller";

class ConversationController extends BaseController {
    constructor() {
        super();
        this.service = ConversationService;
    }

    async createConversation(request, response) {
        try {
            const payload = request.body;
            const { userId } = this.getCredentialInfo(request);
            const responseData = await this.service.createConversation(payload, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create conversation success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }

    async listConversations(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const responseData = await this.service.listConversations(userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get list conversation success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }

    async checkExistConversation(request, response) {
        try {
            const { query } = request
            const { userId } = this.getCredentialInfo(request);
            const responseData = await this.service.checkExistConversation(query, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get list conversation success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }
}
export default new ConversationController();