import React, {useEffect} from "react";
import { useRouter } from "next/router";

const ReviewsWidget = (props) => {
    const {asPath} = useRouter();
    const { product, price, images }= props;
    const { id, title, handle, } = product;
    const strippedId = id?.replace('gid://shopify/Product/', '');

    useEffect(() => {
        if (typeof window.yotpo !== "undefined" && typeof window.yotpoWidgetsContainer) {
            window.yotpoWidgetsContainer.initWidgets();
        }
    }, [asPath, props]);

   /* return (<div className="yotpo yotpo-main-widget"
                 data-product-id={strippedId}
                 data-price={price}
                 data-currency="RON"
                 data-name={title}
                 data-url={'https://' + process.env.NEXT_PUBLIC_API_URL + '/products/' + handle}
                 data-image-url={images[0] ? images[0] : ''}>
    </div>)*/
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