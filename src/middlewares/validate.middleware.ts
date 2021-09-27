import { validationResult } from "express-validator";
import ParametersException from "../exceptions/ParametersException";

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ParametersException(undefined, errors.array()));
  } else {
    return next();
  }
}

export default validate;