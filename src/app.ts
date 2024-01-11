import express, { urlencoded } from "express";
import Router from "./controllers";
const server = express();
const PORT = 1000;
server.use(express.static("public")); //serving static
//middleware
server.use(urlencoded());
Router(server);
server.listen(PORT, () => {
  console.log(`server listen on port 1000, http://localhost:${PORT}`);
});
