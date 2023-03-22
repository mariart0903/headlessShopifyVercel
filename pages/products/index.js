import ProductsList from '../../components/ProductComponents/ProductsList';
import { wrapper } from "../../store/store";
import { setAllProducts } from '../../store/productsSlice';
import { storefront } from "../../utils";
import { productsQuery } from "../../utils/queries";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Pagination from "../../components/Parts/Pagination.js";

const Products = (props) => {
    const products = useSelector((state) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return <div className='mt-8'>
        <ProductsList currentPage={currentPage} pageSize={pageSize} />
        <Pagination
          items={products?.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
    </div>;
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const { data: { products: { edges } } } = await storefront(productsQuery);
        store.dispatch(setAllProducts(JSON.parse(JSON.stringify(edges))));
    })

export default Products;
