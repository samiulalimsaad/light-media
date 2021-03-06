import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import DetailsPost from "../../components/posts/DetailsPost";

const Index: NextPage = () => {
    const router = useRouter();

    const id = router.query.id;

    return (
        <>
            <Head>
                <title>Post | Lite Media</title>
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
            <Layout title="Post">
                <DetailsPost postId={id!} />
            </Layout>
        </>
    );
};

export default Index;
