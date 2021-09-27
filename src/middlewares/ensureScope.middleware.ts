import ForbiddenException from "../exceptions/ForbiddenException";

function ensureScope(allowedScopes: string[]) {
  return (req, res, next) => {
    if (allowedScopes.some((scope) => res.locals.scopes.includes(scope))) {
      return next();
    } else {
      return next(new ForbiddenException());
    }
  };
}

export default ensureScope;
