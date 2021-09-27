import HttpException from "./HttpException";

class ParametersException extends HttpException {
  constructor(message?: string, errors?: any[]) {
    super(400, message ?? "Missing or malformed required parameters.", errors);
  }
}

export default ParametersException;
