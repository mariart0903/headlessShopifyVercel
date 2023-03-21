import React from 'react';
import {wrapper} from "../../store/store";
import {storefront} from "../../utils";
import {getAllArticlesQuery} from "../../utils/queries";
import Link from "next/link";
import parse from "html-react-parser";
import {BLOGS_ROUTE} from "../../utils/constants";

const Blogs = ({articles, blog}) => {
  const renderBlogCards = () => {
    return articles?.map((article, idx) => {
      let collectionUrl = `${BLOGS_ROUTE}/${article?.handle}`;
      return <Link href={collectionUrl} prefetch={false} key={idx}>
        <a>
          <div className='relative pb-[100%]'>
            <img
              src={article?.image?.url}
              alt={article?.image?.altText}
              className="w-full h-full absolute left-0 top-0 object-cover object-center rounded-lg shadow-md"
            />
          </div>
          <div className="relative px-4 -mt-16  ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold uppercase leading-tight truncate">
                {article?.title}
              </h4>
              <div className="pt-2">
                {article?.excerptHtml && parse(article?.excerptHtml)}
              </div>
            </div>
          </div>
        </a>
      </Link>
    });
  };

  return (
    <div className='mt-8'>
      { blog?.title && <h1 className='text-4xl font-bold mb-8'>{blog?.title}</h1>}
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 pb-12 mt-8">
        {renderBlogCards()}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { data: { blog } } = await storefront(getAllArticlesQuery, {handle: 'news'});
    let articlesArray = [];
    blog?.articles?.edges?.forEach((article) => {
      articlesArray.push(article.node);
    });
    return {
      props: {
        articles : JSON.parse(JSON.stringify(articlesArray)),
        blog: JSON.parse(JSON.stringify(blog))
      }
    }
  })

export default Blogs;