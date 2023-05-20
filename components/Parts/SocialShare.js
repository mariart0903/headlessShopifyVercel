import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
} from 'next-share';

import { SEOContext} from "../../pages/products/[id].js";
import {PRODUCTS_ROUTE, STOREFRONT_ROUTE} from "../../utils/constants.js";

const SocialShare = (props) => {

    const { product } = props;
    const { id } = product || {};
    const SEOData = React.useContext(SEOContext);
    const socialTitle = SEOData?.seo_social_title || '';
    const socialDescription = SEOData?.seo_social_description || '';
    const url = `${STOREFRONT_ROUTE}${PRODUCTS_ROUTE}/${id.replace('gid://shopify/Product/', '')}`;

    return (
        <div className="flex flex-row justify-center">
            <FacebookShareButton url={ url }>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={ url }>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TwitterShareButton
              url={ url }
              title={ socialTitle }
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={ url }
              title={ socialTitle }
              windowWidth={ 750 }
              windowHeight={ 600 }
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={ url }
              subject={ socialTitle }
              body={ socialDescription }
            >
                <EmailIcon size={32} round />
            </EmailShareButton>
        </div>
    );
};

export default SocialShare;