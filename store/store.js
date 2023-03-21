import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import products from './productsSlice'
import checkout from './checkoutSlice';
import menu from './menuSlice';

const combinedReducer = combineReducers({
    products,
    checkout,
    menu
});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
}

export const makeStore = () =>
    configureStore({
        reducer: masterReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
    });

export const wrapper = createWrapper(makeStore, { debug: true });
