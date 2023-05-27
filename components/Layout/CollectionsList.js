import {useSelector} from "react-redux";
import {Fragment, useEffect} from 'react';
import {Popover, Transition} from '@headlessui/react';
import Link from "next/link";
import {ChevronDownIcon} from '@heroicons/react/solid';
import {COLLECTIONS_ROUTE} from "../../utils/constants";
import {useRouter} from "next/router";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const CollectionsList = () => {
	const collectionsItems = useSelector((state) => state?.menu?.menuItems?.items);
	const {asPath} = useRouter();

	useEffect(() => {
		if (document) {
			const popBtn = document?.querySelector('.pop-btn[aria-expanded="true"]');
			if (popBtn) {
				popBtn.click();
			}
		}
	}, [asPath]);

	return <>
		{collectionsItems &&
			<Popover.Group className="hidden lg:flex lg:gap-x-12">
				<div
					className="flex h-14 space-x-4 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
					{collectionsItems?.map((collection, collectionIdx) => (
						<Popover key={collectionIdx} className="relative flex">
							{({open}) => (
								<>
									<Popover.Button
										className={classNames(
											open
												? 'border-white text-white'
												: 'border-transparent text-gray-800',
											'pop-btn relative z-10 -mb-px flex items-center border-b-2 pt-px text-md font-medium transition-colors duration-200 ease-out'
										)}
									>
										<p className="text-lg">{collection.title}</p>
										<ChevronDownIcon className="h-5 w-5 flex-none text-gray-900"
														 aria-hidden="true"/>
									</Popover.Button>

									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Popover.Panel
											className="absolute -left-8 top-full z-30 mt-3 w-screen max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
											<div className="absolute inset-0 top-1/2 bg-white shadow"
												 aria-hidden="true"/>
											<div
												className="group relative flex flex-col gap-x-6 rounded-lg p-4 text-sm leading-6">
												{collection?.items?.map((subItem, index) => {
													return <div key={index}
																className="hover:bg-indigo-50 w-full p-2 rounded-lg">
														<Link
															href={`${COLLECTIONS_ROUTE}/${subItem.resourceId.replace('gid://shopify/Collection/', '')}`}
															prefetch={false}>
															<a>
																<p id="clothing-heading"
																   className="font-medium text-gray-900">
																	{subItem.title}
																</p>
															</a>
														</Link>
													</div>
												})
												}
											</div>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					))}

				</div>
			</Popover.Group>
		}
	</>;
}

export default CollectionsList;