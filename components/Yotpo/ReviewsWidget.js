import React, {useEffect} from "react";
import { useRouter } from "next/router";

const ReviewsWidget = (props) => {
    const router = useRouter();
    const { product, price, images }= props;
    const { id, title, handle, } = product || {};
    const strippedId = id?.replace('gid://shopify/Product/', '');

    return (
      <div className="yotpo-widget-instance"
           data-yotpo-instance-id="363116"
           data-yotpo-product-id={strippedId}
           data-yotpo-name={title}
           data-yotpo-url={'https://' + process.env.NEXT_PUBLIC_API_URL + '/products/' + handle}
           data-yotpo-image-url={images[0] ? images[0] : ''}
           data-yotpo-price={price}
      ></div>
    );
};

export default ReviewsWidget;