import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./reducers/allProductsSlice";
import addedProductSlice from "./reducers/addedProductsSlice";

export const store = configureStore({
    reducer: {
        allProductsStore: allProductsSlice,
        addedProductsStore: addedProductSlice
    }
})