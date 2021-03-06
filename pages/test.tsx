import { serverTimestamp } from "firebase/database";
import Head from "next/head";
import React from "react";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../components/Layout";
import { GetState } from "../state/stateProvider";
import { addLikeNotification } from "../util";
const a = [
    {
        type: "error",
        text: "aaa aaa aaa aaa aaaaaaaaaaaa aaa aaa",
        isShowing: true,
    },
    {
        type: "warning",
        text: "bbb bbbbbb bbbbbbbbbbbbbbb bbb bbb bbb",
        isShowing: true,
    },
    { type: "success", text: "ccccccccc ccc ccc ccc cccccc", isShowing: true },
    { type: "error", text: "ddd", isShowing: true },
    { type: "success", text: "eee", isShowing: true },
];

const Test = () => {
    const { notification, profilePic, uid, dispatch } = GetState();

    return (
        <>
            <Head>
                <title>Test | Lite Media</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link
                    rel="icon"
                    href="/logo.svg"
                    sizes="any"
                    type="image/svg+xml"
                />
            </Head>
            <Layout title="test">
                <div className="grid place-items-center h-screen overflow-y-scroll pb-96">
                    <div>
                        <pre>{JSON.stringify(notification, null, 4)}</pre>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                addLikeNotification(
                                    uid,
                                    "saad",
                                    "/",
                                    profilePic,
                                    serverTimestamp(),
                                    dispatch
                                );
                            }}
                        >
                            Click Me
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Test;
