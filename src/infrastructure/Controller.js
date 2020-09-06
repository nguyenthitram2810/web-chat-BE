class BaseController {
    call(method) {
      return this[method].bind(this);
    }
}

export default BaseController;
