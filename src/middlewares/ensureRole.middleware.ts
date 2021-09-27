import ForbiddenException from "../exceptions/ForbiddenException";

function ensureRole(allowedRoles: string[]) {
  return (req, res, next) => {
    if (allowedRoles.includes(res.locals.role)) {
      return next();
    } else {
      return next(new ForbiddenException());
    }
  };
}

export default ensureRole;
