import { Request, Response } from "express";
import fs from "fs";
class PostService {
  constructor() {}
  getAllPostByIdUser(req: Request, res: Response) {
    const readPostUser = fs.readFileSync("public/db-post.json", "utf-8");
    const parsePost = JSON.parse(readPostUser);
    const params = req.params.idUser;
    const findPostOfUser = parsePost.filter((item: any) => {
      return item.userId == params;
    });
    res.send(findPostOfUser ? findPostOfUser : []);
  }
  addNewPost(req: Request, res: Response) {
    const readPost = fs.readFileSync("public/db-post.json", "utf-8");
    const params = req.params.idUser;
    const parsePost = JSON.parse(readPost);
    const newPost = {
      id: parsePost[parsePost.length - 1].id + 1,
      userId: Number(params),
      ...req.body,
    };
    parsePost.push(newPost);
    fs.writeFileSync("public/db-post.json", JSON.stringify(parsePost));
    res.send("add new post ok");
  }
}
export default PostService;
