import React from "react";
import LineItem from "../components/Cart/LineItem";
import {formatPrice, goToCheckout} from "../utils";
import { useSelector } from 'react-redux';

const Cart = () => {
    const checkout = useSelector((state) => state.checkout);

    return (
        <div className="bg-white pb-8 rounded-2xl">
            <header className="Cart__header block">
                <h1 className='text-2xl font-bold'>Your cart</h1>
            </header>
            {checkout?.lineItems?.length <= 0
              ? <h2 className='Cart__header block text-2xl font-bold'>No items in cart</h2>
              : <>
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
                <footer className="Cart__footer text-xl font-bold" >
                  <div className='flex justify-between'>
                    <div className="Cart-info__total">Subtotal</div>
                    { checkout.subtotalPrice && <div>
                      <span className="pricing block">{ formatPrice(checkout.subtotalPrice)}</span>
                    </div> }
                  </div>
                  <div className='flex justify-between'>
                    <div className="Cart-info__total">Taxes</div>
                    { checkout.totalTax && <div>
                      <span className="pricing block">{formatPrice(checkout.totalTax)}</span>
                    </div> }
                  </div>
                  <div className='flex justify-between'>
                    <div className="Cart-info__total">Total</div>
                    { checkout.totalPrice && <div>
                      <span className="pricing block">{formatPrice(checkout.totalPrice)}</span>
                    </div> }
                  </div>

                  <button
                    disabled={ !checkout.checkoutId ? 1 : 0 }
                    onClick={ () => goToCheckout(checkout.checkoutUrl) }
                    type="button"
                    className="mx-auto w-auto mt-8 w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                  >
                    Go to checkout
                  </button>
                </footer>
              </>
            }
        </div>
    );
}

export default Cart;
