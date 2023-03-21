import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function ProductsList() {
    const products = useSelector((state) => state.products.products);
    return (
        <div>
            {!products.length &&
                <div className="flex items-center justify-center ">
                    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                </div>
            }
            {products &&
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                    {products?.map((product, idx) => {
                        return (
                            <ProductCard key={idx} product={ product.node }/>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default ProductsList;
