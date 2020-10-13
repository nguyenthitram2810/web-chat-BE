import httpStatus from "http-status";

export default class BaseController {
  call(method) {
    return this[method].bind(this);
  }

  ErrorHandler(response, error) {
    console.log(error);
    if (error.status) {
        return response.status(httpStatus.OK).json({
            message: error.message,
            status: error.status,
        });
    }
    return response.status(httpStatus.OK).json({
        message: error,
        status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  getCredentialInfo(request) {
    if (request.auth.isAuthenticated) {
      const { id: userId } = request.auth.credentials;
      return { userId };
    }
    return { userId: null };
}
}

