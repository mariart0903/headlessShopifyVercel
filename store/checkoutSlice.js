import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkoutId: null,
    lineItems: [],
    checkoutUrl: null,
    isCartOpen: false,
    subtotalPrice: null,
    totalTax: null,
    totalPrice: null,
}

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckout: (state, action) => {
            state.checkoutId = action.payload.checkoutId;
            state.lineItems = action.payload.lineItems;
            state.checkoutUrl = action.payload.checkoutUrl;
            state.subtotalPrice = action.payload.subtotalPrice;
            state.totalTax = action.payload.totalTax;
            state.totalPrice = action.payload.totalPrice;
        },
        addVariantToCart: (state, action) => {
            state.lineItems = action.payload.lineItems;
            state.subtotalPrice = action.payload.subtotalPrice;
            state.totalTax = action.payload.totalTax;
            state.totalPrice = action.payload.totalPrice;
        },
        updateVariantQuantity: (state, action) => {
            state.lineItems = action.payload.lineItems;
            state.subtotalPrice = action.payload.subtotalPrice;
            state.totalTax = action.payload.totalTax;
            state.totalPrice = action.payload.totalPrice;
        },
        removeVariantFromCart: (state, action) => {
            state.lineItems = action.payload.lineItems;
            state.subtotalPrice = action.payload.subtotalPrice;
            state.totalTax = action.payload.totalTax;
            state.totalPrice = action.payload.totalPrice;
        },
        setCartOpen: (state, action) => {
            state.isCartOpen = true;
        },
        setCartClose: (state, action) => {
            state.isCartOpen = false;
        }
    }
})

export const { setCheckout, addVariantToCart, setCartOpen, setCartClose, updateVariantQuantity } = checkoutSlice.actions

export default checkoutSlice.reducer
