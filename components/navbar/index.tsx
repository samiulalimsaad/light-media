/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GetState } from "../../state/stateProvider";
import { NOTIFICATION_REMOVE } from "../../state/types";
import { blurBase64, NODE_SERVER } from "../../util";
import LeftSide from "../home/left";
import Progressbar from "../progress/progressbar";
import MenuItems from "./menuItems";
import Notification from "./notification";

const setActive = async (id: string) => {
    await axios.post(NODE_SERVER(`/active-user/${id}`));
};

const setDeactive = async (id: string) => {
    await axios.delete(NODE_SERVER(`/active-user/${id}`));
};

const Navbar = () => {
    const {
        createPost,
        uploadCoverPic,
        uploadProfilePic,
        uid,
        notification,
        dispatch,
    } = GetState();
    const [state, setState] = useState("");
    const route = useRouter();

    useEffect(() => {
        notification.map((v) => {
            toast(v?.text, { type: v?.type! });
            dispatch({
                type: NOTIFICATION_REMOVE,
            });
        });
    }, [dispatch, notification]);

    useEffect(() => {
        uid && setActive(uid);
        return () => {
            uid && setDeactive(uid);
        };
    }, [uid]);

    const searchUser = (e: any) => {
        e.preventDefault();
        route.push(`/search?like=${state}`);
    };
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                                <div className="ml-4 flex-shrink-0 flex items-center">
                                    <Link href="/" passHref>
                                        <a className="relative h-12 w-12">
                                            <Image
                                                className="cursor-pointer rounded-full"
                                                src="/logo.svg"
                                                alt="Workflow"
                                                layout="fill"
                                                placeholder="blur"
                                                blurDataURL={blurBase64}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <form
                                    className="hidden sm:flex items-center justify-between ml-auto mr-auto"
                                    onSubmit={searchUser}
                                >
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                                            <SearchIcon
                                                className="h-6 w-6 text-gray-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            onChange={(e) => {
                                                setState(e.target.value);
                                            }}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-10 sm:text-sm border-gray-300 rounded-md bg-gray-300"
                                            placeholder="Search"
                                        />
                                        <button
                                            type="reset"
                                            className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                                        >
                                            <XIcon
                                                className="h-6 w-6 text-gray-600"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="mr-4 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-[777]">
                                <Notification />
                                <MenuItems />
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <LeftSide />
                        </Disclosure.Panel>
                    </div>
                    {(createPost ||
                        uploadProfilePic.isShowing ||
                        uploadCoverPic.imageSrc) && <Progressbar />}
                    <ToastContainer theme="dark" autoClose={8000} />
                </>
            )}
        </Disclosure>
    );
};
export default memo(Navbar);
