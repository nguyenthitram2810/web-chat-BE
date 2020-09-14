import httpStatus from "http-status";
import AuthService from "./auth.service"
import BaseController from '../../infrastructure/Controller'

class AuthController extends BaseController {
    constructor() {
        super();
        this.service = AuthService;
    }

    async signup(request, response) {
        try {
            const payload = request.body;
            const responseData = await this.service.signup(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign up success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }

    async signin(request, response) {
        try {
            const payload = request.body;
            const responseData = await this.service.signin(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign in success",
                data: responseData,
            })
        }
        catch(error) {
            return this.ErrorHandler(response, error);
        }
    }
}
export default new AuthController();