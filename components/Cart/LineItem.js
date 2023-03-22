import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { handleIncrementQty, handleDecrementQty, handleRemoveItem} from "../../utils/cartActions";
import {formatPrice} from "../../utils";

let lineItemAvailableQty = {};

function LineItem (props) {
    const { lineItem } = props;
    const checkoutId = useSelector((state) => state.checkout.checkoutId);
    const dispatch = useDispatch();

    return (
        <li className="Line-item">
            <div className="Line-item__img">
                {lineItem.variant.image ? <img src={lineItem.variant.image.src} alt={`${lineItem.title} product shot`}/> : null}
            </div>
            <div className="Line-item__content">
                <div className="Line-item__content-row">
                    <div className="Line-item__variant-title">
                        {lineItem.variant.title}
                    </div>
                    <span className="Line-item__title">
              {lineItem.title}
            </span>
                </div>
                <div className="Line-item__content-row">
                    <div className="Line-item__quantity-container">
                        <button className="Line-item__quantity-update" onClick={() => handleDecrementQty(dispatch, lineItem, checkoutId)}>-</button>
                        <span className="Line-item__quantity">{lineItem.quantity}</span>
                        <button className="Line-item__quantity-update" onClick={() => handleIncrementQty(dispatch, lineItem, checkoutId, lineItemAvailableQty)}>+</button>
                    </div>
                    <span className="Line-item__price">
                      { formatPrice((lineItem.quantity * lineItem.variant.price).toFixed(2)) }
                    </span>
                    <button className="Line-item__remove" onClick={()=> handleRemoveItem(dispatch, lineItem.id, checkoutId)}>×</button>
                </div>
            </div>
        </li>
    )
}

export default LineItem;
