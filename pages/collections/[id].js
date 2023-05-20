import {storefront} from "../../utils";
import {
  filteredCollectionQuery,
  getAllCollectionsQuery, getRecommendedProductsQuery,
  singleCollectionQuery,
  singleProductQuery,
} from "../../utils/queries";
import ProductCard from "../../components/ProductComponents/ProductCard";
import parse from 'html-react-parser';
import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Pagination from "../../components/Parts/Pagination.js";
import Facets from "../../components/ProductComponents/Facets.js";
import { useRouter } from 'next/router';

const Collection = (props) => {
  const { collection: intialValuesCollection } = props;
  const router = useRouter();
  const { id } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const pageSize = 9;

  const { title, descriptionHtml, products, image: {url: imageUrl, altText: imageAlt} = {}, handle, } = collection || {};

  const getCollectionData = async () => {
    const { data: { collection } } = await storefront(singleCollectionQuery, { id: 'gid://shopify/Collection/' + id , filters: selectedFilters});
    setCollection(collection);
  };

  const getFilteredCollectionData = async () => {
    const { data: { collection } } = await storefront(filteredCollectionQuery, { handle: handle , filters: selectedFilters});
    setCollection(collection);
  };

  useEffect(() => {
    setCollection(intialValuesCollection);
    setSelectedFilters([]);
  }, [router]);

  useEffect(() => {
    if(selectedFilters?.length > 0) {
        getFilteredCollectionData();
    } else {
      getCollectionData();
    }
    setCurrentPage(1);
  }, [selectedFilters]);

  const getPriceRange = useCallback(() => {
    const range = {minPrice: 0, maxPrice: 0};
    products?.edges?.map((product) => {
      if(parseFloat(product.node.priceRange.minVariantPrice.amount) < range.minPrice || range.minPrice === 0) {
        range.minPrice = parseFloat(product.node.priceRange.minVariantPrice.amount);
      }
      if(parseFloat(product.node.priceRange.maxVariantPrice.amount) > range.maxPrice) {
        range.maxPrice = parseFloat(product.node.priceRange.maxVariantPrice.amount);
      };
    });

    return range;
  }, [collection]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const renderProducts = () => {
    const productsRendered = products?.edges?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return productsRendered?.map((product, idx) => {
      return (
        <ProductCard key={idx} product={ product.node }/>
      );
    })
  };

  if (!collection) return (<div>Loading...</div>);
  return <div>
    <div className="relative overflow-hidden bg-white rounded-2xl mb-8">
      <div className="lg:w-1/2 pl-4">
        <div className="relative z-10 bg-white">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mx-auto pr-4 sm:pr-6 lg:pr-8 py-8">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{ title }</span>
              </h1>
              <div className='mt-8'>
                {descriptionHtml && parse(descriptionHtml)}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {imageUrl && (
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full relative">
            <Image
              src={imageUrl || ''}
              alt={imageAlt}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              loading="eager" />
          </div>
        ) }
      </div>
    </div>

    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/5">
        <Facets
          collectionHandle={handle}
          priceRange={getPriceRange()}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters} />
      </div>
      <div className="w-full lg:w-4/5">
        {products &&
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 pb-12">
            {renderProducts()}
          </div>
        }
        <Pagination
          items={products?.edges?.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  </div>;
}

export default Collection;

export async function getStaticProps(context) {
  const { params: {id} } = context;
  const { data: { collection } } = await storefront(singleCollectionQuery, { id: 'gid://shopify/Collection/' + id });
  return {
    props: {
      collection: collection,
    }
  }
}


export async function getStaticPaths() {
  const { data: {collections: {edges} } } = await storefront(getAllCollectionsQuery);
  const paths = edges.map(({ node }) => ({
    params: { id: node.id.replace('gid://shopify/Collection/', '') },
  }));
  return {
    paths,
    fallback: true,
  };
}