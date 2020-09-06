import Service from "./auth.service"
import BaseController from '../../infrastructure/Controller'

class AuthController extends BaseController {
    constructor() {
        super();
        this.service = Service.getService();
    }

    register(req, res) {
        const response = this.service.register()
        console.log(response)
        return res.json({
            message: "Test!!"
        })
    }
}
export default AuthController;