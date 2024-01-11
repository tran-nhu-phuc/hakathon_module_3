import { Request, Response } from "express";
import fs from "fs";
import * as path from "path";
class UserService {
  constructor() {}
  async getUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseData = JSON.parse(readDataUser);
    res.status(200).json(parseData);
  }
  postUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseData = JSON.parse(readDataUser);
    const addNewUser = {
      id: parseData[parseData.length - 1].id + 1,
      ...req.body,
    };
    parseData.push(addNewUser);
    fs.writeFileSync(
      path.join("public/db-user.json"),
      JSON.stringify(parseData)
    );
  }
  deleteUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseData = JSON.parse(readDataUser);
    const params = req.params.id;
    const removeData = parseData.filter((item: any) => {
      return item.id != params;
    });
    fs.writeFileSync("public/db-user.json", JSON.stringify(removeData));
  }
}
export default UserService;
