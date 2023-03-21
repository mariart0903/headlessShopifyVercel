import React from "react";
import {wrapper} from "../../store/store";
import {storefront} from "../../utils";
import {getArticleByHandleQuery} from "../../utils/queries";
import parse from "html-react-parser";

const Article = ({article}) => {
  return (
    <div className='my-12'>
      {article?.title && <h1 className='text-4xl font-bold mb-8'>{article?.title}</h1>}
      <div className="flex">
        <div className="w-2/3 pr-12 ">
          <div className="rte bg-stone-200 rounded-3xl p-4">
            {article?.contentHtml && parse(article?.contentHtml)}
          </div>
        </div>
        <div className="w-1/3">
          {article?.image?.url && <img src={article?.image?.url} alt={article?.image?.altText} className='w-full rounded-3xl'/>}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res, query}) => {
    const { data: { blog: { articleByHandle } }} = await storefront(getArticleByHandleQuery, { handle: 'news', 'articleHandle': query?.handle });

    return {
      props: {
        article: JSON.parse(JSON.stringify(articleByHandle))
      }
    }
  });

export default Article;
