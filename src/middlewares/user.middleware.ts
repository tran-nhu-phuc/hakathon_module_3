import { Request, Response, NextFunction } from "express";
const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validateEmail = /^\S+@\S+\.\S+$/.test(req.body.email);
  if (
    validateEmail &&
    req.body.name.length >= 3 &&
    req.body.name.length <= 20
  ) {
    next();
  } else {
    res.send("error email or name");
  }
};
export default UserMiddleware;
