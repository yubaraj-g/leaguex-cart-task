import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    error: null,
    loading: true
}

export const allProductsSlice = createSlice({
    name: 'allProductsData',
    initialState,
    reducers: {
        getAllProducts: {
            reducer(state, action) {
                state.data = action.payload.data
                state.error = action.payload.error
                state.loading = action.payload.loading
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        }
    }
})

export const asyncApiCall = (url) => async (dispatch) => {
    /** Below console.log is used to check if this function is being called on every re-render */
    // console.log('i ran')
    try {
        const response = await fetch(url)
        const jsonData = await response.json()
        dispatch(getAllProducts({ data: jsonData, loading: false, error: null }))
    } catch (err) {
        dispatch(getAllProducts({ data: null, loading: false, error: err }))
    }
}

export const allData = state => state.allProductsStore

export const { getAllProducts } = allProductsSlice.actions
export default allProductsSlice.reducer