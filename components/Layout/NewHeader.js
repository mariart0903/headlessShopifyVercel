import React, {useEffect, useState} from 'react'
import {Dialog,} from '@headlessui/react';
import {MenuIcon, ShoppingBagIcon, UserIcon} from '@heroicons/react/solid';
import {XIcon,} from '@heroicons/react/outline';
import CollectionsList from "./CollectionsList";
import {useSelector} from "react-redux";
import Link from "next/link";
import {CART_ROUTE, COLLECTIONS_ROUTE, PRODUCTS_ROUTE, CHAT_ROUTE, QUIZ_ROUTE} from "../../utils/constants";
import {useRouter} from "next/router";

const NewHeader = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const {asPath} = useRouter();
	const collectionsItems = useSelector((state) => state?.menu?.menuItems?.items);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [asPath]);

	return (
		<header className="bg-indigo-400">
			<nav className="mx-auto flex-wrap flex container items-center justify-between p-6 lg:px-8"
				 aria-label="Global">
				<div className="mb-4 w-full flex items-center justify-between">
					<div className="flex lg:hidden flex-wrap">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true"/>
						</button>
					</div>
					<Link href={'/'} prefetch={false}>
						<img
							className="h-16 w-auto cursor-pointer"
							src="https://cdn.shopify.com/s/files/1/0684/4874/7817/files/Screenshot_2022-03-20_192841-removebg-preview_2.webp"
							alt=""
						/>
					</Link>
				</div>
				<CollectionsList/>
				<div className="gap-2 flex flex-wrap justify-center">
					<Link href={PRODUCTS_ROUTE} prefetch={false}>
						<a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
							Catalog
						</a>
					</Link>
					<Link href={CHAT_ROUTE} prefetch={false}>
						<a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
							Consultant virtual
						</a>
					</Link>
					<Link href={QUIZ_ROUTE} prefetch={false}>
						<a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
							Quiz virtual
						</a>
					</Link>
					<Link href={CART_ROUTE} prefetch={false}>
						<a className="group inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
							<ShoppingBagIcon className="h-7 w-7 text-white"/>
						</a>
					</Link>
					<Link href={"https://glowupshinemoment.myshopify.com/account/login"} prefetch={false}>
						<a className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
							<UserIcon className="h-7 w-7 text-indigo-600"/>
						</a>
					</Link>
				</div>
			</nav>
			{collectionsItems &&
				<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					<div className="fixed inset-0 z-10"/>
					<Dialog.Panel
						className="bg-indigo-100 fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="p-6">
							<div className="flex items-center justify-between">
								<button
									type="button"
									className="-m-2.5 rounded-md p-2.5 text-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									<span className="sr-only">Close menu</span>
									<XIcon className="h-6 w-6" aria-hidden="true"/>
								</button>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="space-y-4 py-6">
										{collectionsItems?.map((collection, collectionIdx) => (
											<div key={collectionIdx}>
												<p className="font-bold text-gray-900 text-xl">
													{collection.title}
												</p>
												{collection?.items?.map((subItem, index) => {
													return <div key={index}>
														<Link
															href={`${COLLECTIONS_ROUTE}/${subItem.resourceId.replace('gid://shopify/Collection/', '')}`}
															prefetch={false}>
															<a>
																<p className="font-medium text-gray-900 text-lg">
																	{subItem.title}
																</p>
															</a>
														</Link>
													</div>
												})
												}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			}
		</header>
	)
}

export default NewHeader;