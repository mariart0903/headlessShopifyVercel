import {wrapper} from "../../store/store";
import {storefront} from "../../utils";
import {singleCollectionQuery, } from "../../utils/queries";
import ProductCard from "../../components/ProductCard";
import parse from 'html-react-parser';
import React from "react";
import Image from "next/image";

const Collection = ({collection}) => {
  const { title, descriptionHtml, products, image: {url: imageUrl, altText: imageAlt} } = collection;

  const renderProducts = () => {
    return products?.edges?.map((product, idx) => {
      return (
        <ProductCard key={idx} product={ product.node }/>
      );
    })
  };

  return <div>
    <div className="relative overflow-hidden bg-white rounded-2xl  mb-8">
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
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full relative">
          <Image
            src={imageUrl}
            alt={imageAlt}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            loading="eager" />
        </div>
      </div>
    </div>

    {products &&
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 mb-12">
        {renderProducts()}
      </div>
    }
  </div>;
}

export default Collection;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, query}) => {
    const { data: { collection } } = await storefront(singleCollectionQuery, { id: 'gid://shopify/Collection/' + query.id });

    return {
      props: {
        collection: collection
      }
    }
  })
