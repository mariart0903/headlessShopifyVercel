/*
import Client from 'shopify-buy/index.unoptimized.umd';
*/

import Client from "shopify-buy";

export const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_API_URL,
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN
});
