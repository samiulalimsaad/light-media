import { NextPage } from "next";
import Head from "next/head";
import SignUp from "../components/signup/index";
const index: NextPage = () => {
    return (
        <>
            <Head>
                <title>SignUp | Lite Media</title>
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
            <section>
                <SignUp />
            </section>
        </>
    );
};

export default index;
