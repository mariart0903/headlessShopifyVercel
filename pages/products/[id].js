import React, { useState, useEffect } from "react";
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {getRecommendedProductsQuery, singleProductQuery} from "../../utils/queries";
import { storefront, getTags, formatPrice, checkIfObjectsAreEqual, goToCheckout } from "../../utils";
import VariantSelector from "../../components/ProductComponents/VariantSelector";
import {useDispatch, useSelector} from "react-redux";
import { addVariantToCart, setCartOpen, } from "../../store/checkoutSlice";
import { client } from "../../utils/shopifyBuyClient";
import {wrapper} from "../../store/store";
import parse from 'html-react-parser';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ReviewsWidget = dynamic(() => import('../../components/Yotpo/ReviewsWidget'), { ssr: false });

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from "../../components/ProductComponents/ProductCard";

function Product ({product, recommendedProducts}) {
    const dispatch = useDispatch();
    const { asPath } = useRouter();
    const [swiper, setSwiper] = useState(null);
    const [recommendationsSwiper, setRecommendationsSwiper] = useState(null);
    const [ selectedOptions, setSelectedOptions ] = useState({});
    const [ selectedVariant, setSelectedVariant ] = useState({});
    const [ variantQuantity, setVariantQuantity ] = useState(1);
    const [ addToCartError, setAddToCartError ] = useState(null);
    const [ productImages, setProductImages ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const checkoutId = useSelector((state) => state.checkout.checkoutId);
    const checkoutUrl = useSelector((state) => state.checkout.checkoutUrl);
    const lineItems = useSelector((state) => state.checkout.lineItems);
    let qtyInCart = 0;

    useEffect(() => {
        if (!swiper || swiper.destroyed || !recommendationsSwiper || recommendationsSwiper.destroyed){
            return;
        } else {
            swiper.slideTo(0);
            recommendationsSwiper.slideTo(0);
        }
    }, [asPath]);

    const {
        descriptionHtml,
        priceRange:{ minVariantPrice: { amount }},
        tags,
        title,
        variants,
        options,
        id,
    } = product;

    useEffect(() => {
        let defaultOptionValues = {};
        options?.map(option => {
            defaultOptionValues[option.name] = option.values[0];
        })

        let defaultVariant = formattedVariants.find(variant => {
            let variantOptions = variant.selectedOptions;
            return checkIfObjectsAreEqual(variantOptions, defaultOptionValues);
        })

        setSelectedOptions(defaultOptionValues);
        setSelectedVariant(defaultVariant);

        let imagesArray = [];
        product?.images?.edges?.map(image => {
            image?.node?.transformedSrc ? imagesArray.push(image?.node?.transformedSrc) : null;
        });
        setProductImages(imagesArray);
    }, [product]);

    let formattedVariants = [];

    variants?.edges.map(variant => {
        let variantFormatted = {};
        variantFormatted.id = variant.node.id;
        variantFormatted.quantityAvailable = variant.node.quantityAvailable;
        variantFormatted.price = variant.node.priceV2.amount + ' ' + variant.node.priceV2.currencyCode;
        variantFormatted.amount = variant.node.priceV2.amount;
        variantFormatted.image = variant.node.image;
        variantFormatted.selectedOptions = {};
        variant.node.selectedOptions?.map(selectedOption => {
            variantFormatted.selectedOptions[selectedOption.name] = selectedOption.value;
        })
        formattedVariants.push(variantFormatted);
    })

    const renderRecommendedProducts = () => {
        return recommendedProducts?.map((product, idx) => {
            return (
              <SwiperSlide key={idx} style={{height: 'auto'}}>
                <ProductCard isSwiperSlide={true} product={ product }/>
              </SwiperSlide>
            );
        })
    };

    const getVariantsPickers = () => {
        return options?.map((option) =>
            <VariantSelector
                handleOptionChange={ handleOptionChange }
                key={option.id.toString()}
                option={option}
            />
        )
    }

    const handleOptionChange = (event) => {
        const target = event.target
        let selectedOpt = selectedOptions;
        selectedOpt[target.name] = target.value;

        const selectedVariant = formattedVariants.find(variant => {
            return checkIfObjectsAreEqual(variant.selectedOptions, selectedOpt);
        })

        const selectedImageIndex = productImages?.findIndex((image, index) => {
            if (image === selectedVariant.image.transformedSrc) {
                return index;
            }
        });

        if (!swiper || swiper.destroyed || !selectedImageIndex) {
            return;
        } else swiper.slideTo(selectedImageIndex);

        setSelectedOptions(selectedOpt);
        setSelectedVariant(selectedVariant);
    }
    const handleQuantityChange = (event) => {
        const target = event.target;
        parseInt(target.value) > parseInt(target.max) ? setVariantQuantity(target.max) : setVariantQuantity(target.value);
    }

    const handleAddVariantToCart = () => {
        setIsLoading(true);
        setAddToCartError(null);

        if(qtyInCart + variantQuantity <= selectedVariant.quantityAvailable) {
            let lineItemsToAdd = {
                quantity: parseInt(variantQuantity),
                variantId: selectedVariant.id,
            };
            client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
                setIsLoading(false);

                dispatch(addVariantToCart({
                    lineItems: checkout.lineItems,
                    subtotalPrice: checkout.subtotalPrice,
                    totalTax: checkout.totalTax,
                    totalPrice: checkout.totalPrice,
                }));
                dispatch(setCartOpen());
            });
        } else {
            setAddToCartError('Not enough quantity available');
            setIsLoading(false);
        }

    }

    const getVariantQtyAddedToCart = () => {
        let qtyAdded = 0;
        lineItems.map((item) => {
            if (item.variant.id === selectedVariant.id) {
                qtyAdded = item.quantity;
            }
        })
        return qtyAdded;
    }
    qtyInCart = getVariantQtyAddedToCart();

    return (
        <div>
            <div className="bg-white">
                <main className="mx-auto py-14 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">

                        <div className="lg:row-end-1 lg:col-span-4">
                            { productImages.length > 0 ? <Swiper
                              modules={[Navigation, Pagination, A11y]}
                              spaceBetween={50}
                              slidesPerView={1}
                              navigation
                              pagination={{ clickable: true }}
                              onSwiper={(swiper) => setSwiper(swiper)}
                            >
                                { productImages.map((image, index) =>
                                  <SwiperSlide key={index}>
                                      <div className="aspect-w-3 aspect-h-3 rounded-lg overflow-hidden">
                                          <img src={image} alt="product image" className="object-center object-cover mx-auto"/>
                                      </div>
                                  </SwiperSlide>)
                                }
                            </Swiper> :
                              <div className="aspect-w-3 aspect-h-3 rounded-lg overflow-hidden">
                                  <img src={selectedVariant?.image?.transformedSrc} alt={selectedVariant?.image?.altText} className="object-center object-cover mx-auto" />
                              </div>
                            }
                        </div>

                        <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
                            <div className="flex flex-col-reverse">
                                <div className="mt-4">
                                    <h1 className="text-2xl font-extrabold tracking-tight text-indigo-900 sm:text-3xl">
                                        {title}
                                    </h1>
                                    <h2 id="information-heading" className="sr-only">
                                        Product information
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {getTags(tags, tags?.length)}
                                    </p>
                                </div>
                            </div>

                            <div className="my-2">
                                <div className="yotpo bottomLine"
                                     data-yotpo-product-id={id?.replace('gid://shopify/Product/', '')}>
                                </div>
                            </div>

                            <p className="text-3xl tracking-tight text-gray-900 mt-4 font-bold"> { formatPrice(selectedVariant?.amount) } </p>

                            <div className="text-gray-500 my-6">{ descriptionHtml && parse(descriptionHtml) }</div>

                            <div className={ 'flex flex-col' }>
                                { getVariantsPickers() }
                                <div>
                                    <label>Select Quantity</label>
                                    <input
                                        onChange={ handleQuantityChange }
                                        type="number"
                                        className={ 'select_styles' }
                                        min={ 1 }
                                        value={ variantQuantity }
                                        max={ selectedVariant?.quantityAvailable ? parseInt(selectedVariant?.quantityAvailable) - parseInt(qtyInCart) : 0}
                                    />
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {addToCartError &&
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert">
                                    <strong className="font-bold">{ addToCartError }</strong>
                                </div>
                                }

                                <button
                                    disabled={ (selectedVariant?.quantityAvailable < 1 || !checkoutId ) ? 1 : 0 }
                                    onClick={ handleAddVariantToCart }
                                    type="button"
                                    className={ `w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 ${selectedVariant?.quantityAvailable >= 1 ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-200'}` }
                                >
                                    { isLoading ?
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg> :
                                      <span>
                                          Add To Cart { selectedVariant?.amount ? formatPrice(selectedVariant?.amount) : ''}
                                      </span>
                                    }
                                </button>
                                <button
                                    disabled={ !checkoutId ? 1 : 0 }
                                    onClick={ () => goToCheckout(checkoutUrl) }
                                    type="button"
                                    className="w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                                >
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    {recommendedProducts?.length > 0 &&
                      <div className="mt-16">
                          <h3 className="text-3xl text-indigo-900 mt-4 mb-8">Produse recomandate: alegeri similare ale altor clienti</h3>
                          <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={20}
                            breakpoints={{
                                1250: {
                                    slidesPerView: 4.5,
                                },
                                1024: {
                                    slidesPerView: 3.5,
                                },
                                769: {
                                    slidesPerView: 2.5,
                                },
                            }}
                            slidesPerView={1.5}
                            navigation
                            pagination={{ clickable: true }}
                            onSwiper={(swiper) => setRecommendationsSwiper(swiper)}
                          >
                              {renderRecommendedProducts()}
                          </Swiper>
                      </div>
                    }
                    <div className="mt-8">
                        <ReviewsWidget product={product} price={selectedVariant?.amount} images={productImages}/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Product;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ req, res, query}) => {
        const { data: { product } } = await storefront(singleProductQuery, { id: 'gid://shopify/Product/' + query.id });
        const { data:  { productRecommendations }} = await storefront(getRecommendedProductsQuery, { productId: 'gid://shopify/Product/' + query.id });
        return {
            props: {
                product: product,
                recommendedProducts: productRecommendations
            }
        }
    });
