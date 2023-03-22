import React, { useEffect } from "react";
import CartDrawer from "../Cart/CartDrawer";
import Header from "./Header";
import NewHeader from "./NewHeader";
import { client} from "../../utils/shopifyBuyClient";
import { useDispatch } from "react-redux";
import { setCheckout } from "../../store/checkoutSlice";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isCartPage = router.pathname === "/cart" ? true : false;

    useEffect(() => {
        const checkout_id = localStorage.getItem("checkout_id");
        if(!checkout_id) {
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
            <NewHeader />
            { !isCartPage ? <CartDrawer /> : null }
            <main
              className="bg-center bg-repeat-y pt-8"
              style={{backgroundImage: 'url("/images/lines2.png")'}}
            >
                <div className={ 'px-4 sm:px-6 lg:px-8 container mx-auto ' }>{children}</div>
            </main>
        </div>
    )
}

export default Layout;
