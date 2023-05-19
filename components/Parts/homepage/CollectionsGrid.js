import react from 'react';
import {useSelector} from "react-redux";
import Masonry from 'react-masonry-css'
import Image from "next/image";
import Link from "next/link";

const CollectionsGrid = (props) => {
	const {collections} = props;
	const renderSubCollections = () => {
		return collections?.map((item, idx) => {
			let collectionUrl = '/collections/' + item?.id?.replace('gid://shopify/Collection/', '');
			return <div key={idx} className="relative my-masonry-grid_item">
				<Link href={collectionUrl} prefetch={false} className="block">
					<a className="h-full">
						<p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-2xl text-white z-[20] font-medium text-center italic drop-shadow-lg p-[20px]">{item?.title}</p>
						<img
							className={'!min-h-[130px] xl:!min-h-[170px] object-cover' }
							src={item?.image?.url}
							width={640}
							height={640 * Math.random() }
						/>
					</a>
				</Link>
			</div>;
		});
	};

	const breakpointColumnsObj = {
		default: 4,
		1250: 3,
		768: 2,
		400: 1
	};

	return (<div className="py-[40px]">
		<h2 className="pb-[40px] text-center text-3xl">Colectii</h2>
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column">
			{renderSubCollections()}
		</Masonry>
	</div>);
};

export default CollectionsGrid;