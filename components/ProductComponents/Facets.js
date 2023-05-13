import React, {useEffect, useState} from "react";
import {storefront} from "../../utils";
import {getCollectionFacets, } from "../../utils/queries.js";

const Facets = (props) => {
    const { collectionHandle, setSelectedFilters, selectedFilters, priceRange } = props;
    const [filters, setFilters] = useState([]);
    const [minPrice, setMinPrice] = useState(priceRange?.minPrice);
    const [maxPrice, setMaxPrice] = useState(priceRange?.maxPrice);

    const handleFacetClick = (e) => {
        if(selectedFilters.includes( JSON.parse(e.target.dataset.input))) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !==  JSON.parse(e.target.dataset.input)));
        } else {
            setSelectedFilters([...selectedFilters, JSON.parse(e.target.dataset.input)]);
        }
    };

    const renderFacets = () => {
        return filters?.map((filter, idx) => {
          if(filter.type === 'LIST') {
              return <div key={idx} className="mb-[20px]">
                  <h4>{filter.label}</h4>
                  <ul className="flex flex-wrap">{filter.values.map((value, idx) => {
                      return <li key={idx} className="p-1">
                          <button
                            className="font-medium text-sm py-1 px-2 rounded-3xl bg-indigo-200 hover:bg-indigo-400"
                            type="button"
                            onClick={handleFacetClick}
                            data-input={value.input}
                        >{value.label}</button>
                      </li>
                  })}</ul>
              </div>
          } else if(filter.type === 'PRICE_RANGE') {
              return <div key={idx} className="mb-[20px]">
                  <h4>{filter.label}</h4>
                  <div className="flex flex-wrap gap-[10px]">
                      <label htmlFor="minPrice">
                        <span>Pretul minim</span>
                        <input
                            id="minPrice"
                            type={'number'}
                            value={minPrice}
                            min={minPrice}
                            max={maxPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </label>
                      <label htmlFor="maxPrice">
                        <span>Pretul maxim</span>
                        <input
                            id="maxPrice"
                            type={'number'}
                            value={maxPrice}
                            min={minPrice}
                            max={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </label>
                      <button type={'button'} onClick={() => {}}> Submit </button>
                  </div>
              </div>
          }
        })
    };

    useEffect(() => {
        const getCollectionFacetsInfo = async () => {
            const { data: { collectionByHandle: {products} } } = await storefront(getCollectionFacets, {handle: collectionHandle});
            setFilters(products?.filters);
        }
        if(collectionHandle) {
            getCollectionFacetsInfo();
        }
    }, [collectionHandle]);

    return <div className="bg-white rounded-3xl p-2">{renderFacets()}</div>
};

export default Facets;