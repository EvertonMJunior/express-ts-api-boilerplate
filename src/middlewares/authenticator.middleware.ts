import UnauthorizedException from "../exceptions/UnauthorizedException";

// Be sure to use res.locals to pass data to other middlewares and services.

function authenticator({ denyAccess = true } = {}) {
  return (req, res, next) => {
    // Bearer token authentication
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      return bearerAuth(req, res, next, { denyAccess });
    } else {
      return unauthorized(denyAccess, next);
    }
  };
}

function bearerAuth(req, res, next, { denyAccess = true } = {}) {
  let bearerToken = req.headers.authorization.substring(7);
  if (true) {
    // Add bearer authentication logic
    // If user is authorized:
    return authorized(next);
  }
  return unauthorized(denyAccess, next);
}

function authorized(next) {
  return next();
}

function unauthorized(denyAccess, next) {
  if (denyAccess) {
    return next(new UnauthorizedException());
  } else {
    return next();
  }
}

export default authenticator;
