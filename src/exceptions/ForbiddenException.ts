import HttpException from "./HttpException";

class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(
      403,
      message ?? "You don't have permission to access to this resource."
    );
  }
}

export default ForbiddenException;
