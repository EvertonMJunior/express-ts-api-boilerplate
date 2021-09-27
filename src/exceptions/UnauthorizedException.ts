import HttpException from "./HttpException";

class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(401, message ?? "Unauthorized.");
  }
}

export default UnauthorizedException;
