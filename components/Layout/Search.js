import React, { useState, useEffect} from 'react';
import { storefront} from "../../utils/index";
import { getProductByTitleQuery2 } from "../../utils/queries";
import SearchItem from "../ProductComponents/SearchItem";
import { useRouter} from "next/router";
import { MicrophoneIcon } from '@heroicons/react/solid';
import {startSpeechRecognition} from "../../utils/speechWebApi";

const Search = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchOpen, setSearchOpen] = useState(false);
	const [ isListening, setIsListening ] = useState(false);

	useEffect(() => {
		handleClearSearch();
	}, [router]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchTerm.length >= 3) {
				performSearch(searchTerm);
				setSearchOpen(true);
			} else {
				setSearchResults([]);
				setSearchOpen(false);
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm,]);

	const performSearch = async (query) => {
		const { data: { products: {edges} = {} } = {} } = await storefront(getProductByTitleQuery2, { title: query, tag: query });
		setSearchResults(edges);
	};

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};
	const handleClearSearch = () => {
		setSearchTerm('');
		setSearchResults([]);
		setSearchOpen(false);
	};
	const handleMicClick = () => {
		startSpeechRecognition(setSearchTerm, setIsListening);
	};

	const renderProducts = () => {
		return searchResults.length > 0 ? searchResults?.map((product, idx) => {
			return (
			  <SearchItem key={idx} product={ product.node }/>
			);
		}) : <p className="md:text-base text-lg font-medium text-center">No results found</p>;
	};
	return (
	  <div className="bg-indigo-400">
		  <div className="bg-indigo-400 relative mx-auto flex-wrap flex items-center justify-between p-6 pt-0 lg:px-8">
			  <div className="container mx-auto md:w-1/2">
				  <div className="relative">
					  <svg aria-hidden="true" className="absolute top-[10px] left-[10px] w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
						   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					  </svg>
					  <input
						className=" px-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleChange}
					  />
					  <div onClick={ handleMicClick } className="absolute cursor-pointer top-[10px] right-[30px]">
						  <MicrophoneIcon className={ `h-5 w-5 ${isListening ? 'text-gray-400' : ''}`}/>
					  </div>
					  <button type="button" onClick={ handleClearSearch } className="absolute top-[16px] right-[10px] ">
						  <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" viewBox="0 0 460.775 460.775" fill="currentColor">
							  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
		c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
		c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
		c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
		l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
		c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>
						  </svg>
					  </button>
				  </div>
			  </div>
			  {searchOpen && (
				<div className="bg-indigo-400 z-[10] top-[100%] pt-2 pb-4 absolute w-full left-0">
					<div className="container mx-auto grid gap-[8px] md:gap-[12px] lg:gap-[16px] xl:gap-[20px] grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
						{renderProducts()}
					</div>
				</div>
			  )}
		  </div>
	  </div>
	)
};

export default Search;