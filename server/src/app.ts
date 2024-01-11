import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import Router from "./controller";
import bodyParser from "body-parser";
const server = express();
const PORT = 4000;
//middleware
server.use(express.static("public")); //serving static
server.use(urlencoded());
server.use(bodyParser.json());
server.use(cors()); //cross origin resource sharing => mở việc bị chặn chia sẻ tài nguyên giữa các domain khác nhau
Router(server);
server.listen(PORT, () => {
  console.log(`server listen on port 4000, http://localhost:${PORT}`);
});
