import CommentModel from "../models/CommentModel.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        res.send(comments);
    } catch(error) {
        console.error(error);
        res.send("fehler");
    }
}

export const createComment = async (req, res) => {
    const commentData = req.body;
    const comment = new CommentModel(commentData);
    try {
        await comment.save();
        res.send("your comment was saved")
    } catch(error) {
        console.error(error);
    }
}
