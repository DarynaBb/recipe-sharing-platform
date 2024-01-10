import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
})

const CommentModel = mongoose.model("Comments", commentSchema);
export default CommentModel;