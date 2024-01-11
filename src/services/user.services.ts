import { Request, Response } from "express";
import fs from "fs";
class UserService {
  constructor() {}
  //get all user "/"
  async getAllUser(req: Request, res: Response) {
    const getAllUsers = fs.readFileSync("public/db-user.json", "utf-8");
    const parseUser = JSON.parse(getAllUsers);
    const querySearch = req.query.nameSearch?.toString().toLowerCase();
    if (!req.query.nameSearch) {
      res.send(parseUser);
    } else {
      //search by name user "?nameSearch=..."
      const searchByNameUser = parseUser.filter((item: any) => {
        return item.name.toLowerCase().includes(querySearch);
      });
      res.json(searchByNameUser);
    }
  }
  //get 1 user with id "/detail/:id"
  getDetailUser(req: Request, res: Response) {
    const params = req.params.id;
    const getUserAll = fs.readFileSync("public/db-user.json", "utf8");
    const getPostAll = fs.readFileSync("public/db-post.json", "utf-8");
    const parseUser = JSON.parse(getUserAll);
    const parsePost = JSON.parse(getPostAll);
    const getDetails = parseUser.find((item: any) => {
      return item.id == params;
    });
    const getPostOfUser = parsePost.filter((item: any) => {
      return item.userId == params;
    });
    const dataAllUser = { getDetails, getPostOfUser };
    res.send(dataAllUser);
  }
  addUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseUser = JSON.parse(readDataUser);
    const addNewUser = {
      id: parseUser[parseUser.length - 1].id + 1,
      ...req.body,
    };
    parseUser.push(addNewUser);
    fs.writeFileSync("public/db-user.json", JSON.stringify(parseUser));
    res.send("add user ok");
  }
  patchAddressUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseUser = JSON.parse(readDataUser);
    const params = req.params.id;
    const checkIndexUser = parseUser.findIndex((item: any) => {
      return item.id == params;
    });
    parseUser[checkIndexUser] = {
      ...parseUser[checkIndexUser],
      address: req.body.address,
    };
    fs.writeFileSync("public/db-user.json", JSON.stringify(parseUser));
    res.send("edit ok");
  }
  deleteUser(req: Request, res: Response) {
    const readDataUser = fs.readFileSync("public/db-user.json", "utf-8");
    const parseUser = JSON.parse(readDataUser);
    const params = req.params.id;
    const removeUser = parseUser.filter((item: any) => {
      return item.id != params;
    });
    fs.writeFileSync("public/db-user.json", JSON.stringify(removeUser));
    res.send("remove ok");
  }
}
export default UserService;
