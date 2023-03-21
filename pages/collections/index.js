import { wrapper } from "../../store/store";
import { storefront } from "../../utils";
import { getAllCollectionsQuery } from "../../utils/queries";
import parse from "html-react-parser";
import Link from "next/link";

const Collections = ({collections}) => {
  const renderCollectionCards = () => {
    return collections?.map((collection, idx) => {
      let collectionUrl = '/collections/' + collection?.id?.replace('gid://shopify/Collection/', '');

      return <Link href={collectionUrl} prefetch={false} key={idx}>
        <a>
          <div className='relative pb-[100%]'>
            <img
              src={collection?.image?.url}
              alt={collection?.image?.altText}
              className="w-full h-full absolute left-0 top-0 object-cover object-center rounded-lg shadow-md"
            />
          </div>
          <div className="relative px-4 -mt-16  ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold uppercase leading-tight truncate">
                {collection?.title}
              </h4>
              <div className="pt-2">
                {collection?.descriptionHtml && parse(collection?.descriptionHtml)}
              </div>
            </div>
          </div>
        </a>
      </Link>
    });
  };
  return <div className='mt-8'>
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 mb-12">
      {renderCollectionCards()}
    </div>
  </div>;
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { data: {collections: {edges} } } = await storefront(getAllCollectionsQuery);
    let collectionsArray = [];
    edges?.forEach((collection) => {
      collectionsArray.push(collection.node);
    });
    return {
      props: {
        collections : JSON.parse(JSON.stringify(collectionsArray))
      }
    }
  })

export default Collections;
