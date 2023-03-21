import ProductsList from '../../components/ProductsList';
import { wrapper } from "../../store/store";
import { setAllProducts } from '../../store/productsSlice';
import { storefront } from "../../utils";
import { productsQuery } from "../../utils/queries";

const Products = (props) => {
    return <div className='mt-8'>
        <ProductsList />
    </div>;
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const { data: { products: { edges } } } = await storefront(productsQuery);
        store.dispatch(setAllProducts(JSON.parse(JSON.stringify(edges))));
    })

export default Products;
