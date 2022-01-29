import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    deletePost,
    getPostMiddleware,
    getSinglePost,
} from "../../../../../backend/controllers/post/post.controller";
import { findUserMiddleware } from "../../../../../backend/controllers/user.Controller";
import connectDB from "../../../../../backend/db";
import { onError } from "../../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware, getPostMiddleware)
    .get(getSinglePost)
    .delete(deletePost);
export default connectDB(handler);
