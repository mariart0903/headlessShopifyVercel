import React, {useCallback, useEffect} from "react";
import {useRouter} from "next/router";

const ReviewsWidget = (props) => {
	const router = useRouter();
	const {product, price, images} = props;
	const {id, title, handle,} = product || {};
	const strippedId = id?.replace('gid://shopify/Product/', '');

	useEffect(() => {
		if (typeof window.yotpo !== "undefined") {
			window.yotpoWidgetsContainer.initWidgets();
		}
	}, [router, product]);

	const renderYotpo = useCallback(() => {
		return <div className="yotpo-widget-instance"
					data-yotpo-instance-id="363116"
					data-yotpo-product-id={strippedId}
					data-yotpo-name={title}
					data-yotpo-url={'https://' + process.env.NEXT_PUBLIC_API_URL + '/products/' + handle}
					data-yotpo-image-url={images[0] ? images[0] : ''}
					data-yotpo-price={price}
		></div>
	}, [product, router]);

	return (
		<div>{renderYotpo()}</div>
	);
};

export default ReviewsWidget;