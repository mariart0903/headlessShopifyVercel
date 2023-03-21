import React from "react";
import Link from "next/link";
import {formatPrice, getTags} from "../utils";
import {PRODUCTS_ROUTE} from "../utils/constants";

function ProductCard(props) {
    const { product }= props;
    const {
        id,
        images,
        title,
        tags,
        handle,
        priceRange:{ minVariantPrice: { amount }}
    }=product;
    const image = images ? images.edges[0].node : {};

    return (
        <Link href={`${PRODUCTS_ROUTE}/${id.replace('gid://shopify/Product/', '')}`} prefetch={ false }>
            <a className="group shadow-2xl p-4 rounded-xl bg-indigo-100" >
                <div className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                    <img
                        src={image.transformedSrc}
                        alt={image.altText}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                </div>
                <div className="mt-4 flex justify-between text-base font-medium text-gray-900 items-start">
                    <h3>{ title }</h3>
                    <p className={ 'pl-4' }>{ formatPrice(amount) }</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">{ getTags(tags, tags.length) }</p>
            </a>
        </Link>
    );
}

export default ProductCard;
