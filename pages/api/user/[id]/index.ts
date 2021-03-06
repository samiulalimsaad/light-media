import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
    deleteUser,
    findUserMiddleware,
    getSingleUser,
    updateUser,
} from "../../../../backend/controllers/user.Controller";
import connectDB from "../../../../backend/db";
import { onError } from "../../../../backend/utils/onError";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError,
    attachParams: true,
})
    .use(findUserMiddleware)
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
export default connectDB(handler);
