import React, {useEffect, useState} from "react";
import {storefront} from "../../utils";
import {getCollectionFacets,} from "../../utils/queries.js";
import _ from "lodash";
import {quizTags} from '../../utils/constants';

const Facets = (props) => {
	const {collectionHandle, setSelectedFilters, selectedFilters, priceRange} = props;
	const [filters, setFilters] = useState([]);

	useEffect(() => {
		const getCollectionFacetsInfo = async () => {
			const {data: {collectionByHandle: {products}}} = await storefront(getCollectionFacets, {handle: collectionHandle});
			setFilters(products?.filters);
		}
		if (collectionHandle) {
			getCollectionFacetsInfo();
		}
	}, [collectionHandle]);

	const handleFacetClick = (e) => {
		const copySelectedFilters = _.cloneDeep(selectedFilters);
		let indexFound = null;
		copySelectedFilters?.forEach((filter, idx) => {
			if (JSON.stringify(filter) === e.target.dataset.input) {
				indexFound = idx;
			}
		});
		if (indexFound !== null) {
			setSelectedFilters(selectedFilters.filter((filter, idx) => idx !== indexFound));
		} else {
			setSelectedFilters([...selectedFilters, JSON.parse(e.target.dataset.input)]);
		}
	};

	const renderFacets = () => {
		return filters?.map((filter, idx) => {
			if (filter.type === 'LIST') {
				return <div key={idx} className="mb-[10px] lg:mb-[20px]">
					<h4>{filter.label}</h4>
					<ul className="flex flex-wrap">{filter.values.map((value, idx) => {
						if (quizTags.includes(value.label)) return;
						let found = false;
						selectedFilters?.forEach((filter) => {
							if (JSON.stringify(filter) === value.input) {
								found = true;
							}
						});
						return <li key={idx} className="p-1">
							<button
								className={`font-medium text-sm py-1 px-2 rounded-3xl ${found ? 'bg-indigo-400' : 'bg-indigo-200'} hover:bg-indigo-400`}
								type="button"
								onClick={handleFacetClick}
								data-input={value.input}
							>{value.label}</button>
						</li>
					})}</ul>
				</div>
			}
		})
	};


	return <div className="bg-white rounded-3xl p-2">{renderFacets()}</div>
};

export default Facets;