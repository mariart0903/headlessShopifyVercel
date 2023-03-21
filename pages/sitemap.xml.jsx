import React from 'react';
const Sitemap = () => {
    return null;
};
const BASE_URL = 'http://localhost:3000';
export const getServerSideProps = async ({ res }) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
            return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;


import * as fs from 'fs';
import {storefront} from "../utils";
import {productsQuery} from "../utils/queries";

const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
        return ![
            "api",
            "_app.js",
            "_document.js",
            "404.js",
            "sitemap.xml.jsx",
        ].includes(staticPage);
    })
    .map((staticPagePath) => {
        return `${BASE_URL}/${staticPagePath}`;
    });

async function getProducts() {
    const { data: { products: { edges } } } = await storefront(productsQuery);
    const dynamicPaths = edges.map(({ node: { handle } }) => {
        return `${BASE_URL}/products/${handle}`;
    });
    return dynamicPaths;
}
const dynamicPaths = await getProducts().then(response => {
      return response;
});

const allPaths =[ ...staticPaths , ...dynamicPaths ];
