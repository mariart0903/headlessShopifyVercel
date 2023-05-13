import React from "react";
import Link from "next/link";
import {formatPrice, getTags} from "../../utils";
import {PRODUCTS_ROUTE} from "../../utils/constants";

function SearchItem(props) {
	const { product, isSwiperSlide, }= props;
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
		  <a className={`group shadow-2xl p-1 rounded-xl bg-indigo-100 block ${ isSwiperSlide ? 'h-full' : ''}`} >
			  <div className={ `w-full ${ isSwiperSlide ? 'aspect-w-2' : 'aspect-w-3'} aspect-h-3 rounded-lg overflow-hidden` }>
				  <img
					src={image.transformedSrc || ''}
					alt={image.altText}
					className="w-full h-full object-center object-cover group-hover:opacity-75"
				  />
			  </div>
			  <div className="mt-1 text-gray-900 items-start">
				  <h3 className="text-sm">{ title }</h3>
				  <p className="text-sm">{ formatPrice(amount) }</p>
			  </div>
			  <p className="mt-1 text-sm italic text-gray-500">{ getTags(tags, tags.length) }</p>
		  </a>
	  </Link>
	);
}

export default SearchItem;
