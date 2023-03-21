import React, {useEffect} from "react";
import { useRouter } from "next/router";

const ReviewsWidget = (props) => {
    const {asPath} = useRouter();
    const { product, price, images }= props;
    const { id, title, handle, } = product;
    const strippedId = id?.replace('gid://shopify/Product/', '');

    useEffect(() => {
        if (typeof window.yotpo !== "undefined") {
            window.yotpo.initWidgets();
        }
    }, [asPath, props]);

    return (<div className="yotpo yotpo-main-widget"
                 data-product-id={strippedId}
                 data-price={price}
                 data-currency="RON"
                 data-name={title}
                 data-url={'https://' + process.env.NEXT_PUBLIC_API_URL + '/products/' + handle}
                 data-image-url={images[0] ? images[0] : ''}>
    </div>)
};

export default ReviewsWidget;