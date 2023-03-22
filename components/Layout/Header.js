import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/solid";
import Link from "next/link";
import CollectionsList from "./CollectionsList";
import {CART_ROUTE, PRODUCTS_ROUTE} from "../../utils/constants";


const Header = () => {
    return (
        <header className="bg-indigo-400">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex items-center justify-center pt-6">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-16 w-auto"
                      src="https://cdn.shopify.com/s/files/1/0684/4874/7817/files/Screenshot_2022-03-20_192841-removebg-preview_2.webp"
                      alt=""
                    />
                </div>
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <CollectionsList />
                    <div className="ml-10 space-x-4 flex">
                        <Link href={ PRODUCTS_ROUTE } prefetch={ false }>
                            <a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                Catalog
                            </a>
                        </Link>

                        <Link href={ CART_ROUTE } prefetch={ false }>
                            <a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                <ShoppingBagIcon className="h-7 w-7 text-white"/>
                            </a>
                        </Link>

                        <a
                            href="@/components/Layout/Header#"
                            className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                            Account
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
