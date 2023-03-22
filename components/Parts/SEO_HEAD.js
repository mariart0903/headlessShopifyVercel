import React from 'react';
import Head from 'next/head';
import {SEOContext} from "../../pages/products/[id].js";
const WEBSITE_NAME = 'GlowUp Shine Moment';

export default function SeoHead() {
    const SEOData = React.useContext(SEOContext);
    const title = SEOData?.seo_title || WEBSITE_NAME;
    const socialImage = SEOData?.seo_social_image || WEBSITE_NAME;
    const description = SEOData?.seo_description || WEBSITE_NAME;
    const socialTitle = SEOData?.seo_social_title || WEBSITE_NAME;
    const socialDescription = SEOData?.seo_social_description || WEBSITE_NAME;


    return (
      <Head>
          <title>{ title }</title>
          <meta
            name="twitter:card"
            content="summary_large_image" />
          <meta
            name="description"
            content={ description } />
          <meta
            property="og:title"
            content={ socialTitle } />
          <meta
            property="og:description"
            content={ socialDescription } />
          <meta
            property="og:image"
            content={ socialImage } />
      </Head>
    );
}