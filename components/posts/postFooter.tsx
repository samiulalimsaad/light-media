import { AnnotationIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid";
import axios from "axios";
import { serverTimestamp } from "firebase/database";
import Link from "next/link";
import React from "react";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_ADD } from "../../state/types";
import { addLikeNotification, NODE_SERVER } from "../../util";

interface postHeaderInterface {
    like: string[];
    comment: string[];
    share: string[];
    id: string;
    userId: string;
}

const PostFooter = ({ like, comment, userId, id }: postHeaderInterface) => {
    const { uid, profilePic, displayName, dispatch } = GetState();

    const addLike = async () => {
        try {
            if (like.includes(uid!)) {
                const { data } = await axios.delete(
                    NODE_SERVER(`/post/like/${uid}/${id}`)
                );
                if (data.success) {
                    console.log("like removed");
                }
            } else {
                const { data } = await axios.post(
                    NODE_SERVER(`/post/like/${uid}`),
                    {
                        like: uid,
                        postId: id,
                    }
                );
                if (data.success) {
                    userId !== uid &&
                        addLikeNotification(
                            userId,
                            displayName,
                            `/post/${id}`,
                            profilePic,
                            serverTimestamp(),
                            dispatch
                        );
                }
            }
        } catch (error) {
            dispatch({
                type: NOTIFICATION_ADD,
                payload: { type: "error", text: (error as Error).message },
            });
        }
    };
    return (
        <div className="flex items-center justify-between px-1 w-full divide-x divide-gray-500">
            <button
                className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center"
                onClick={addLike}
            >
                {like?.length > 0 && <span>{like?.length}</span>}
                {like?.includes(uid!) ? (
                    <ThumbUpIconSolid
                        className="h-5 w-5 ml-3"
                        aria-hidden="true"
                    />
                ) : (
                    <ThumbUpIcon className="h-5 w-5 ml-3" aria-hidden="true" />
                )}
            </button>
            <Link href={`/post/${id}`} passHref>
                <a className="p-3 transition ease-in-out duration-500 hover:bg-indigo-400/50 active:bg-indigo-700/50 flex flex-1 justify-center items-center">
                    {comment?.length > 0 && <span>{comment.length}</span>}
                    <AnnotationIcon
                        className="h-5 w-5 ml-3"
                        aria-hidden="true"
                    />
                </a>
            </Link>
        </div>
    );
};

export default PostFooter;
