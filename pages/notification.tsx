import type { NextPage } from "next";
import Head from "next/head";
import Home from "../components/home/index";
import Navbar from "../components/navbar";
const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Notifications | Lite Media</title>
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
            <header>
                <Navbar />
            </header>
            <section className="max-w-7xl h-screen w-screen mx-auto px-2 sm:px-6 lg:px-8">
                <Home>Notification</Home>
            </section>
        </>
    );
};

export default Index;