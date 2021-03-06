import Head from "next/head";
import Login from "../components/login";
function login() {
    return (
        <>
            <Head>
                <title>Login | Lite Media</title>
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
                <Login />
            </section>
        </>
    );
}

export default login;
