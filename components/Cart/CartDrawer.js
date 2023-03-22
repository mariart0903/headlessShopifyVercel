import React, { useEffect, useRef, }  from "react";
import LineItem from "./LineItem";
import { useSelector, useDispatch } from 'react-redux';
import { setCartClose } from "../../store/checkoutSlice";
import {goToCheckout} from "../../utils";

const CartDrawer = () => {
    const dispatch = useDispatch();
    const checkout = useSelector((state) => state.checkout);
    console.log(checkout);

    useEffect(() => {
      document.addEventListener('click', handleBodyClick, { capture: true });
      return () => {
        document.removeEventListener('click', handleBodyClick );
      }
    },[]);

    const handleCartClose = () => {
        dispatch(setCartClose());
    };

    const handleBodyClick = (e) => {
      if(checkout?.isCartOpen && !e.target?.matches('#modal-drawer, #modal-drawer *')) {
        handleCartClose();
      }
    };

    return (
        <div className={`Cart ${checkout?.isCartOpen ? 'Cart--open' : ''}`} id="modal-drawer">
            <header className="Cart__header">
                <h2>Your cart</h2>
                <button
                    className="Cart__close"
                    onClick={ handleCartClose }
                >
                    x
                </button>
            </header>
            <ul className="Cart__line-items">
                { checkout?.lineItems?.map((lineItem, idx) => {
                    return (
                        <LineItem
                            key={ idx }
                            lineItem={ lineItem }
                        />
                    )
                })}
            </ul>
            {checkout?.lineItems?.length > 0 && (
              <button
                disabled={ !checkout.checkoutId ? 1 : 0 }
                onClick={ () => goToCheckout(checkout.checkoutUrl) }
                type="button"
                className="w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
              >
                  Go to checkout
              </button>
            ) }
        </div>
    )
}

export default CartDrawer;
