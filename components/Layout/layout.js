import React, {useEffect} from "react";
import CartDrawer from "../Cart/CartDrawer";

import NewHeader from "./NewHeader";
import {client} from "../../utils/shopifyBuyClient";
import {useDispatch} from "react-redux";
import {setCheckout} from "../../store/checkoutSlice";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {CHAT_ROUTE, CART_ROUTE, QUIZ_ROUTE} from "../../utils/constants";

const Search = dynamic(() => import('./Search'), {ssr: false});
const Auglio = dynamic(() => import('../../components/Parts/auglio/Auglio.js'), {ssr: false});

const Layout = ({children}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const isCartPage = router.pathname === "/cart" ? true : false;
	const isHomePage = router.pathname === "/" ? true : false;

	useEffect(() => {
		if (typeof window.yotpo !== "undefined") {
			window.yotpo.refreshWidgets();
		}
	}, [router, children]);

	const showMirror = () => {
		const {pathname} = router;
		if (pathname !== CART_ROUTE && pathname !== CHAT_ROUTE && pathname !== QUIZ_ROUTE) return true;
		return false;
	};
	const showMirrorWidget = showMirror();

	useEffect(() => {
		const checkout_id = localStorage.getItem("checkout_id");
		if (!checkout_id) {
			client.checkout.create().then(checkout => {
				localStorage.setItem("checkout_id", checkout.id);
				dispatch(setCheckout({
					checkoutId: checkout.id,
					lineItems: checkout.lineItems,
					checkoutUrl: checkout.webUrl,
					subtotalPrice: checkout.subtotalPrice,
					totalTax: checkout.totalTax,
					totalPrice: checkout.totalPrice,
				}));
			});
		} else {
			client.checkout.fetch(checkout_id).then((checkout) => {
				dispatch(setCheckout({
					checkoutId: checkout.id,
					lineItems: checkout.lineItems,
					checkoutUrl: checkout.webUrl,
					subtotalPrice: checkout.subtotalPrice,
					totalTax: checkout.totalTax,
					totalPrice: checkout.totalPrice,
				}));
			});
		}
	}, [children]);

	return (
		<div className="min-h-screen">
			<NewHeader/>
			<Search/>
			{!isCartPage ? <CartDrawer/> : null}
			<main
				className="bg-center bg-repeat-y py-8 main-bg"
				/*style={{backgroundImage: 'url("/images/lines2.png")'}}*/
			>
				<div className="fixed z-[999] bottom-[20px] right-[30px]">
					{showMirrorWidget && <Auglio/>}
				</div>
				<div className={`${isHomePage ? '' : 'px-4 sm:px-6 lg:px-8'} container mx-auto`}>{children}</div>
			</main>
		</div>
	)
}

export default Layout;
