import React from 'react';
import HeroSwiper from "../components/Parts/homepage/HeroSwiper";
import ProductsList from "../components/ProductComponents/ProductsList";
import CollectionsGrid from "../components/Parts/homepage/CollectionsGrid";
import {wrapper} from "../store/store.js";
import {storefront} from '../utils/index.js';
import {getAllCollectionsQuery, HPproductsQuery} from "../utils/queries.js";
import {setAllProducts} from "../store/productsSlice.js";

const Index = (props) => {
    const { collections } = props;
    return (
        <>
            <HeroSwiper />
            <div className="px-4 sm:px-6 lg:px-8">
                <CollectionsGrid collections={collections}/>
                <h2 className="pb-[40px] text-center text-3xl">Noutati</h2>
                <ProductsList currentPage={1} pageSize={12}/>
            </div>
        </>
    );
}
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const { data: { products: { edges } } } = await storefront(HPproductsQuery);
        store.dispatch(setAllProducts(JSON.parse(JSON.stringify(edges))));
        const { data: {collections: {edges: collectionEdges} } } = await storefront(getAllCollectionsQuery);
        let collectionsArray = [];
        collectionEdges?.forEach((collection) => {
            collectionsArray.push(collection.node);
        });
        return {
            props: {
                collections : JSON.parse(JSON.stringify(collectionsArray))
            }
        }
    })


export default Index
