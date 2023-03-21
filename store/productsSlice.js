import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        setAllProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { addProduct, setAllProducts } = productsSlice.actions

export default productsSlice.reducer
