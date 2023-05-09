import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
}

export const addedProductSlice = createSlice({
    name: "addedProductsSlice",
    initialState,
    reducers: {
        addProducts: {
            reducer(state, action) {
                state.data.push(action.payload)
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        },
        removeProducts: {
            reducer(state, action) {
                // This action is for removing one single product at a time
                /** First it takes the index of the product from the state and then array.splice takes out the element from the array and array.filter is not being used since we want to remove only one item not alll of it's kind */
                const incomingProduct = action.payload
                let index = null
                state.data.forEach((product, i) => {
                    if (JSON.stringify(product) === JSON.stringify(incomingProduct)) {
                        index = i
                    }
                })
                if (index !== null) {
                    state.data.splice(index, 1)
                }
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        },
        deleteWholeProduct: {
            reducer(state, action) {
                /** below function will return the array of products except the one that has been send by the component */
                state.data = state.data.filter(product => JSON.stringify(product) !== JSON.stringify(action.payload))
            },
            prepare(data) {
                return {
                    payload: data
                }
            }
        }
    }
})

export const addedProducts = state => state.addedProductsStore.data
export const { addProducts, removeProducts, deleteWholeProduct } = addedProductSlice.actions
export default addedProductSlice.reducer