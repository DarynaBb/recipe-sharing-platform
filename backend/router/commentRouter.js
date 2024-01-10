import { Router } from "express";
import { getAllComments, createComment } from "../controller/commentController.js";

const commentRouter = Router();

commentRouter
    .get("/comments", getAllComments)
    .post("/comments", createComment)

 
export default commentRouter;    