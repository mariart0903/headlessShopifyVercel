import {client} from "./shopifyBuyClient";
import {updateVariantQuantity} from "../store/checkoutSlice";
import {storefront} from "./index";
import {getProductByTitleQuery, singleProductQuery} from "./queries";

export const handleDecrementQty = async (dispatch, line_item, checkoutId) => {
    if(line_item.quantity - 1 > 0) {
        const lineItemsToUpdate = [{id: line_item.id, quantity: line_item.quantity - 1}];
        client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(checkout => {
            dispatch(updateVariantQuantity({
                lineItems: checkout.lineItems,
                subtotalPrice: checkout.subtotalPrice,
                totalTax: checkout.totalTax,
                totalPrice: checkout.totalPrice,
            }));
        });
    }
};

export const handleIncrementQty = async (dispatch, line_item, checkoutId, lineItemAvailableQty) => {
    if(!lineItemAvailableQty[line_item.variant.id]) {
        const { data: { product } } = await storefront(singleProductQuery, { id: line_item.variant.product.id });
        product?.variants.edges.map(variant => {
            if(variant.node.id === line_item.variant.id) {
                lineItemAvailableQty[line_item.variant.id] = variant.node.quantityAvailable;
            }
        })
    }
    if(line_item.quantity + 1 <= lineItemAvailableQty[line_item.variant.id]) {
        const lineItemsToUpdate = [{id: line_item.id, quantity: line_item.quantity + 1}];
        client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(checkout => {
            dispatch(updateVariantQuantity({
                lineItems: checkout.lineItems,
                subtotalPrice: checkout.subtotalPrice,
                totalTax: checkout.totalTax,
                totalPrice: checkout.totalPrice,
            }));
        });
    }
};

export const handleRemoveItem = (dispatch, id, checkoutId) => {
    client.checkout.removeLineItems(checkoutId, [id]).then(checkout => {
        dispatch(updateVariantQuantity({
            lineItems: checkout.lineItems,
            subtotalPrice: checkout.subtotalPrice,
            totalTax: checkout.totalTax,
            totalPrice: checkout.totalPrice,
        }));
    });
};
